var MongoClient = require('mongodb').MongoClient;
var mongoUrl = "mongodb://localhost:27017/shorter";

const db = {
    saveUrl : (slug, url) => {
        
        MongoClient.connect(mongoUrl, function (err, db) {
            if (err) throw err
            var dbo = db.db("mydb")
            var link = { slug:slug, url:url }
            dbo.collection("links").insertOne(link, function (err, res) {
                if (!err) 
                    console.log("1 link inserted")
                db.close()
            });
        });

    },
    fetchUrl : (slug) => {
        console.log("Find", slug)
        return new Promise((resolve, reject) => {
            MongoClient.connect(mongoUrl, function(err, db) {
                if (err) 
                    reject(err)
                
                var dbo = db.db("mydb");
                dbo.collection("links").findOne({slug:slug}, function(err, result) {
                  if (err) {
                        reject(err)
                  }else{
                        console.log(result)
                        resolve(result)
                  }
                  db.close()
                  
                });
              });
        })
        
    }
}
export default db