const sqlite3 = require('sqlite3').verbose();

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
  collection_id INTEGER,
  subscribers INTEGER,
  city TEXT NOT NULL,
  date TEXT NOT NULL,
  time_start TEXT NOT NULL,
  time_end TEXT NOT NULL,
  photo BLOB NULL,
  FOREIGN KEY (organizer_id) REFERENCES Collections (id) ON DELETE CASCADE,
  FOREIGN KEY (collection_id) REFERENCES Events (id)
);`;

const sql_comments = `CREATE TABLE IF NOT EXISTS Comments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  text TEXT NOT NULL,
  event_id INTEGER,
  author_id INTEGER,
  FOREIGN KEY (event_id) REFERENCES Events (id) ON DELETE CASCADE,
  FOREIGN KEY (author_id) REFERENCES Users (id) ON DELETE CASCADE
);`;

const sql_collections = `CREATE TABLE IF NOT EXISTS Collections (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  photo BLOB NULL
);`;

const vote_event = `CREATE TABLE IF NOT EXISTS VoteEvent (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  vote INTEGER,
  event_id INTEGER,
  author_id INTEGER,
  FOREIGN KEY (event_id) REFERENCES Events (id) ON DELETE CASCADE,
  FOREIGN KEY (author_id) REFERENCES Users (id) ON DELETE CASCADE
);`;

const vote_collection = `CREATE TABLE IF NOT EXISTS VoteCollection (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  vote INTEGER,
  collection_id INTEGER,
  author_id INTEGER,
  FOREIGN KEY (collection_id) REFERENCES Collection (id) ON DELETE CASCADE,
  FOREIGN KEY (author_id) REFERENCES Users (id) ON DELETE CASCADE
);`;

const subscribe_event = `CREATE TABLE IF NOT EXISTS SubscribeEvent (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  event_id INTEGER,
  subscriber_id INTEGER,
  FOREIGN KEY (event_id) REFERENCES Events (id) ON DELETE CASCADE,
  FOREIGN KEY (subscriber_id) REFERENCES Users (id) ON DELETE CASCADE
);`;

db.serialize(() => {
  db.run(sql_users, err => {
    if (err) return console.error(err.message);
    console.log("Successful creation of the 'Users' table");
  });

  db.run(sql_collections, err => {
    if (err) return console.error(err.message);
    console.log("Successful creation of the 'Collections' table");
  });
  
  db.run(sql_events, err => {
    if (err) return console.error(err.message);
    console.log("Successful creation of the 'Events' table");
  });
  
  db.run(sql_comments, err => {
    if (err) return console.error(err.message);
    console.log("Successful creation of the 'Comments' table");
  });

  db.run(vote_event, err => {
    if (err) return console.error(err.message);
    console.log("Successful creation of the 'VoteEvent' table");
  });

  db.run(vote_collection, err => {
    if (err) return console.error(err.message);
    console.log("Successful creation of the 'VoteCollection' table");
  });

  db.run(subscribe_event, err => {
    if (err) return console.error(err.message);
    console.log("Successful creation of the 'SubscribeEvent' table");
  });
})

db.close()