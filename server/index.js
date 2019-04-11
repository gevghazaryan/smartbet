const http = require('http');
const url = require('url');
const querystring = require('querystring');
const Datastore = require('nedb');

const db = new Datastore('./db/games.db');

const countries = ['Spain','Italy','England','France','Germany','Netherlands'];
const leaguesByCountriesInsideDB = [
    ['Spain', ['SP1','SP2']],
    ['Italy', ['I1','I2']],
    ['England', ['E0','E1','E2','E3','EC']],
    ['France', ['F1','F2']],
    ['Germany', ['D1','D2']]
]

let server = http.createServer((req,res) => {
    const uri = url.parse(req.url);
    // console.log(uri,uri.pathname)
    let qStr = querystring.parse(uri.query);
    console.log('qstr is',qStr)
    console.log('path',uri.pathname,url.pathname === '/training')
    if(uri.pathname === '/homePage') {
        console.log('qstr data is',qStr.data)
        if(qStr.data == 'countries') {
            res.setHeader('Content-Type','application/json');
            res.setHeader('Access-Control-Allow-Origin','*')
            const cJson = countries;
            res.write(JSON.stringify(cJson));
            res.end('');
        }
    } else if(uri.pathname === '/training') {
        console.log('training path')
        db.loadDatabase(function(err) {
            if(err) {
                console.log(err)
            } else {
                res.setHeader('Content-Type','application/json');
                res.setHeader('Access-Control-Allow-Origin','*')
                const cJson = leaguesByCountriesInsideDB.filter(item => item[0] === qStr.data)[0][1];
                res.write(JSON.stringify(cJson));
                res.end('');                                
            }
        })
    } else if(uri.pathname === '/trainingBox') {
        console.log('in the training box');
        db.loadDatabase(function(err) {
            if(err) {
                console.log(err)
                return false
            }
            db.find({$and: [{season: qStr.year},{Div: qStr.league}]})
                .sort({"Date": 1})
                .exec(function(err,data) {
                    if(err) {
                        console.log('error in sending',err)
                        return false
                    } else {
                        res.setHeader('Content-Type','application/json');
                        res.setHeader('Access-Control-Allow-Origin','*')
                        res.write(JSON.stringify(data));
                        res.end('');
                    }
                })
        })
    }

})

server.listen(5000)