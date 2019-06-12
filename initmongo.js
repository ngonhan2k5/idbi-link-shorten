var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/shorter";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log("Database created!");

  var dbo = db.db("mydb");
  dbo.createCollection("links", function(err, res) {
    if (err) throw err;
    console.log("Collection created!");
    dbo.collection("links").createIndex( { "slug": 1 }, { unique: true } )
    db.close();
  });


  
});