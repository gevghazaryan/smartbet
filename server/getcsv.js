const cheerio = require('cheerio');
const axios = require('axios');
const fs = require('fs');
const url = require('url');

const countries = ['england','Germany','Italy','Spain','France','Netherlands','Portugal','Belgium']

const mainUrl = 'http://www.football-data.co.uk';
const urlOfCsv = `http://www.football-data.co.uk/${countries[5]}dm.php`;

axios.get(urlOfCsv)
.then(function(response) {
    const $ = cheerio.load(response.data);
    const links = [];
    $('i').each(function(index,item){
        $(this).nextUntil('i').filter('a').each(function(index,item){
            // console.log($(this).attr('href'))
            links.push(mainUrl + '/' + $(this).attr('href'))
        })
    })

    links.pop()

    return links
})
.then(function(links){
    return axios.all(links.slice(0,20).map(function(link){
        return axios.get(link,{responseType: 'stream'})
    }))
})
.then(res => {
    res.forEach(r => {
        const myUrl = new URL(r.config.url)
        let dirName = myUrl.pathname.split('/').slice(2).join('/')
        let folderName = dirName.split('/')[0];
        if(!fs.existsSync(`./csv/${folderName}`)) {
            fs.mkdirSync(`./csv/${folderName}`)
        }
        r.data.pipe(fs.createWriteStream(`./csv/${dirName}`))
    
    })

})
    
.catch(function(error) {
    console.log('error is', error)
})