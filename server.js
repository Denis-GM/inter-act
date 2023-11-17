const express = require('express');
const app = express();
const port = 3000;

const cors = require('cors');

const sqlite3 = require('sqlite3').verbose();
const DBSOURCE = "db.sqlite";

/*
let db = new sqlite3.Database(DBSOURCE, (error) => {
  if (error) {
    console.error(error.message)
    throw error
  }
  else
  {
    db.run(`CREATE TABLE Products (
        Id INTEGER PRIMARY KEY AUTOINCREMENT,
        Title TEXT,             
        Quantity INTEGER,             
        DateModified DATE,
        DateCreated DATE
        )`,
    (error) => {
        if (error) {
          console.log("Table already created")
        }
        else {
            var insert = 'INSERT INTO Products (Title, Quantity, DateCreated) VALUES (?,?,?)'
            db.run(insert, ["Baseball", 3, Date('now')])
            db.run(insert, ["Football", 5, Date('now')])
            db.run(insert, ["Apple", 6, Date('now')])
            db.run(insert, ["Orange", 7, Date('now')])
            console.log("A table was created")
        }
    });  
  }
});
*/

app.use(
  cors(
    { origin: `http://localhost:5173`, }
  )
);

app.use(express.static('src/static'));

app.get('/', (req, res) => {
  res.send('index.html')
});

// import events from './moks/events.json'
app.get("/api/events", (req, res) => {
  let events = require('./moks/events.json')
  res.json(events)
  // let sql = "SELECT * FROM Products"
  // let params = []
  // db.all(sql, params, (error, rows) => {
  //   if (error) {
  //     res.status(400).json({"error":error.message});
  //     return;
  //   }
  //   else{
  //     res.json({
  //       "message":"success",
  //       "data":rows
  //     })
  //   }
  // });
});

app.get("/api/product/:id", (req, res, next) => {

  // const sql = "SELECT * FROM Products WHERE Id = ?";
  // db.get(sql, req.params.id, (err, rows) => {
  //   if (err) {
  //     res.status(400).json({"error": err.message});
  //     return;
  //   }
  //   else{
  //     res.json({
  //       "message":"success",
  //       "data":rows
  //     })
  //   }
  // });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
  console.log(`Server is running on http://localhost:${port}/`)
})