const Datastore = require('nedb');

const db = new Datastore('../db/games.db');

const update = (query) => new Promise((res,rej) => {
    db.update(query,{$set: {Date: }})
}) 


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
        
        console.table(docs[1])
    })
}) 