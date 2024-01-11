const express = require('express');
const app = express();
const port = 3000;

const cors = require('cors');
const { Database } = require('sqlite3');

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('db.sqlite');

const bodyParser = require('body-parser')
app.use(bodyParser.json({ limit: '50mb' }));

const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(
  cors(
    { origin: `http://localhost:5173`, }
  )
);

app.use(express.static('src/static'));

app.get('/', (req, res) => {
  res.send('index.html')
});

// Получить мороприятия, на которые я подписан
app.get("/api/myEventsSub/:id", (req, res) => {
  let sql = `SELECT * FROM SubscribeEvent 
             INNER JOIN Events ON Events.id = SubscribeEvent.event_id
             WHERE organizer_id = ?`
  db.all(sql, req.params.id, (error, rows) => {
    if (error) {
      res.status(400).json({"error":error.message});
    }
    else {
      res.status(200).json(rows);
    }
  });
});

// Получить МОИ мороприятия
app.get("/api/myEvents/:id", (req, res) => {
  let sql = "SELECT * FROM Events WHERE organizer_id = ?"
  db.all(sql, req.params.id, (error, rows) => {
    if (error) {
      res.status(400).json({"error":error.message});
    }
    else {
      res.status(200).json(rows);
    }
  });
});

// Получить все мороприятия
app.get("/api/events", (req, res) => {
  let sql = "SELECT * FROM Events"
  let params = []
  db.all(sql, params, (error, rows) => {
    if (error) {
      res.status(400).json({"error":error.message});
    }
    else {
      res.status(200).json(rows);
    }
  });
});

app.get("/api/collections", (req, res) => {
  let sql = "SELECT * FROM Collections"
  let params = []
  db.all(sql, params, (error, rows) => {
    if (error) {
      res.status(400).json({"error":error.message});
    }
    else{
      res.status(200).json(rows);
    }
  });
});

app.get("/api/event/:id", (req, res) => {
  const sql = "SELECT * FROM Events WHERE id = ?";
  db.get(sql, req.params.id, (err, rows) => {
    if (err) {
      res.status(400).json({"error": err.message});
    }
    else{
      res.status(200).json(rows)
    }
  });
});

app.post("/api/event", jsonParser, (req, res) => {
  const data = req.body;
  const sql = `INSERT INTO Events
  (title, description, organizer_id, city, date, time_start, time_end, photo)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
  // const sql = `INSERT INTO Events
  // (title, description, organizer_id, city, time_start, time_end, photo)
  // VALUES (?, ?, ?, ?, ?, ?, ?)`;
  console.log(data)
  db.run(sql, [data.title, data.description, data.organizer_id, data.city, data.date, data.time_start, data.time_end, data.photo], 
    (err, rows) => {
    if (err) {
      res.status(400).json({"error": err.message});
    }
    else{
      res.status(201);
    }
  });
});


// Регистрация
app.post("/api/register", jsonParser, (req, res, next) => {
  const data = req.body;
  const sql = `INSERT INTO Users
  (full_name, email, login, password, photo)
  VALUES (?, ?, ?, ?, ?)`;
  db.run(sql, [data.full_name, data.email, data.login, data.password, null], 
    (err) => {
    if (err) {
      res.status(400).json({"error": err.message});
    }
    else {
      res.status(201);
    }
  });
});

// Авторизация
app.post("/api/login", jsonParser, (req, res) => {
  const data = req.body;
  const sql = "SELECT * FROM Users WHERE login = ? AND password = ?";
  db.get(sql, [data.login, data.password], (err, rows) => {
    if (err) {
      res.status(400).json({"error": err.message});
    }
    else if(rows) {
      res.status(200).json(rows)
    }
    else {
      res.status(400).send('Invalid login or password');
    }
  });
});

app.post("/api/account", jsonParser, (req, res) => {
  const data = req.body;
  const sql = "SELECT * FROM Users WHERE id = ?";
  db.get(sql, [data.id], (err, rows) => {
    if (err) {
      res.status(400).json({"error": err.message});
    }
    else {
      res.status(200).json(rows)
    }
  });
});

// Создать событие
app.post("/api/register", jsonParser, (req, res, next) => {
  const data = req.body;
  const sql = `INSERT INTO Users
  (full_name, email, login, password, photo)
  VALUES (?, ?, ?, ?, ?)`;
  db.run(sql, [data.full_name, data.email, data.login, data.password, null], 
    (err) => {
    if (err) {
      res.status(400).json({"error": err.message});
    }
    else {
      res.status(201);
    }
  });
});

// Получить подписку
app.post("/api/existSubscribe", jsonParser, (req, res) => {
  const data = req.body;
  const sql = `SELECT * FROM SubscribeEvent WHERE event_id = ? AND subscriber_id = ?`
  db.get(sql, [data.event_id, data.subscriber_id], (err, result) => {
    if (err) {
      res.status(400).json({ "error": res.message })
    }
    else {
      if(result)
        res.status(200).json({idSubscribe: result.id, exist: true })
      else 
        res.status(200).json({ exist: false })
    }
  });
});

// Подписаться на событие 
app.post("/api/subscribe", jsonParser, (req, res) => {
  const data = req.body;
  const sql = `
    INSERT INTO SubscribeEvent (event_id, subscriber_id)
    VALUES (?, ?)`;
    // IF NOT EXISTS (
    //   SELECT * 
    //   FROM SubscribeEvent 
    //   WHERE event_id = ${data.event_id} AND subscriber_id = ${data.subscriber_id}
    // )
  db.run(sql, [data.event_id, data.subscriber_id], (err, rows) => {
    if (err) {
      res.status(400).json({"error": err.message});
    }
    else {
      res.status(201).json(rows)
    }
  });
});

// Отписаться от события
app.delete("/api/subscribe/:id", (req, res) => {
  const sql = `DELETE FROM SubscribeEvent WHERE id = ?`
  db.run(sql, req.params.id, (err, result) => {
    if (err) {
      res.status(400).json({ "error": res.message })
    }
    else {
      res.status(200).json({ deletedID: this.changes })
    }
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
  console.log(`Server is running on http://localhost:${port}/`)
})