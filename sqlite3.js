const sqlite3 = require('sqlite3').verbose();

// const db_name = path.join("db.sqlite");
const db = new sqlite3.Database("db.sqlite", err => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Successful connection to the database 'db.sqlite'");
});

const sql_users = `CREATE TABLE IF NOT EXISTS Users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  full_name TEXT,
  email TEXT NOT NULL,
  login TEXT NOT NULL,
  password TEXT NOT NULL,
  photo BLOB
);`;

const sql_events = `CREATE TABLE IF NOT EXISTS Events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  organizer_id INTEGER,
  city TEXT NOT NULL,
  date TEXT NOT NULL,
  time_start TEXT NOT NULL,
  time_end TEXT NOT NULL,
  photo BLOB NULL,
  FOREIGN KEY (organizer_id) REFERENCES Users (id) ON DELETE CASCADE
);`;

const sql_comments = `CREATE TABLE IF NOT EXISTS Comments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  text TEXT NOT NULL,
  event_id INTEGER,
  author_id INTEGER,
  FOREIGN KEY (event_id) REFERENCES Events (id) ON DELETE CASCADE,
  FOREIGN KEY (author_id) REFERENCES Users (id) ON DELETE CASCADE
);`;

db.serialize(() => {
  db.run(sql_users, err => {
    if (err) return console.error(err.message);
    console.log("Successful creation of the 'Users' table");
  });
  
  db.run(sql_events, err => {
    if (err) return console.error(err.message);
    console.log("Successful creation of the 'Events' table");
  });
  
  db.run(sql_comments, err => {
    if (err) return console.error(err.message);
    console.log("Successful creation of the 'Comments' table");
  });
})

db.close()