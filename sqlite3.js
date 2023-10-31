const sqlite3 = require('sqlite3').verbose()
// const db = new sqlite3.Database(':memory:')
const db = new sqlite3.Database('db.sqlite')

db.serialize(() => {
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
  // const stmt = db.prepare('INSERT INTO lorem VALUES (?)')

  // for (let i = 0; i < 10; i++) {
  //   stmt.run(`Ipsum ${i}`)
  // }

  // stmt.finalize()

  // db.each('SELECT rowid AS id, info FROM lorem', (err, row) => {
  //   console.log(`${row.id}: ${row.info}`)
  // })
})

db.close()