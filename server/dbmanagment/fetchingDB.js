const { readdirSync, statSync } = require('fs')
const { join } = require('path')
const DataStore = require('nedb');
const csv = require('csv');
const fs = require('fs');

let db = new DataStore('../db/games.db');

const dirs = p => readdirSync(p).filter(f => statSync(join(p, f)).isDirectory());
const files = p => readdirSync(p).filter(f => !statSync(join(p,f)).isDirectory());

const dirsArr = dirs('../csv');
const filesInDirs = dirsArr.reduce((mapArr,dir) => {
    let filesArr = files(`../csv/${dir}`).map(item => `../csv/${dir}/${item}`);
    return mapArr.concat(filesArr)
},[])





db.loadDatabase(function(error){
    if(error) {
        console.log(error)
    } else {

        readAndInsert(filesInDirs)
    }
    
})

const readAndParse = (file) => new Promise((res,rej) => {

    const csvParse = csv.parse({
        delimiter: ',',
        columns: true,
        trim: true
    })    

    let f = fs.createReadStream(file);

    const output = [];
    f.on('end',() => {res(output)})
    f.on('error',(error) => rej(error))

    f.pipe(csvParse)
        .on('readable',function(){
            let record;
            while(record = this.read()) {
                output.push(record)
            }
        })    
})

async function insertIntoDB(data) {
    let insert = () => new Promise((res,rej) => {
        db.insert(data,function(error) {
            if(error) {
                return rej(error)
            } else {
                return res('there is no error')
            }
        })
    })
    .catch(err => {console.log(err)})
    insert()

}

async function readAndInsert(files) {
    let file = ''
    while(file = files.pop()) {
        let year = `20${file.split('/')[2].slice(-2)}`
        let csvData = await readAndParse(file);
        csvData = csvData.map(csv => {
            let newCsv = {};
            newCsv.season = year
            for(let key of Object.keys(csv)) {
                newCsv[key.split('.').join('')] = csv[key]
            }
            return newCsv

        })
        await insertIntoDB(csvData)
    }
}



