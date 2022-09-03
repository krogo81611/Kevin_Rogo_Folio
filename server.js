const express = require("express");
const app = express();
const cors = require('cors')

const MongoClient = require("mongodb").MongoClient;



require("dotenv").config();


let db,

  dbConnectionStr = process.env.DB_STRING,
 
  dbName = "PortfolioContact";


MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })

  .then((client) => {

    console.log(`Connected to ${dbName} Database`);

    db = client.db(dbName);

  });

app.set("view engine", "ejs");

app.use(express.static("public"));

app.use(cors)

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(express.static('public'))

app.get('/', (req,res) => {
    res.sendFile('index.html');
});


app.post("/contactMe", (request, response) => {
  db.collection("ContactInfo")
    .insertOne({name: request.body.name, email: request.body.email, message: request.body.message })
    .then((result) => {
      console.log("Contact Submitted Successfully");


      response.redirect("/");
    })

    .catch((error) => console.error(error));
});


app.listen(process.env.PORT || PORT, () => {
  console.log(`Server running`);
});
