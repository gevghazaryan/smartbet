const Datastore = require('nedb');
const moment = require('moment');

const db = new Datastore('../db/games.db');

db.loadDatabase(function(error){
    if(error) {
        console.log('error is',error)
        return false
    }

    db.find({},function(err,docs){
        if(err) {
            console.log(`error while finding`,err)
            return false
        }
        docs.forEach(function(item,index){
            
        })
        console.table(docs[1])
    })
}) 