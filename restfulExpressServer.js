import express from 'express';
import pg from 'pg';

const app = express();
const port = 1337;
app.use(express.json());
app.listen(port,() => {
  console.log(`Listening on port ${port}`)
});

const { Pool } = pg;
const pool = new Pool({
  host: '127.0.0.1',
  port: '5432',
  database: 'petshop',
  user: 'postgres',
  password: 'password'
});

app.get('/pets', (req, res) => {
  pool.query('SELECT * FROM pets', (err, data) => {
    if (err) {
      res.status(404).send("Resource doesn't exist.")
    }
    return res.status(200).send(data.rows);
  })
});

app.get('/pets/:id', (req, res) => {
  const id = req.params.id;
  pool.query(`SELECT * FROM pets WHERE id = '${id}'`, (err, data) => {
    if (err) {
      res.status(404).send("Resource doesn't exist.")
    }
    res.status(200).send(data.rows[0]);
  })
})

app.post('/pets', (req, res) => {
  const age = Number.parseInt(req.body.age);
  const {name, kind} = req.body;
  pool.query(`INSERT INTO pets (age, kind, name) VALUES ('${age}', '${kind}', '${name}')`, (err) => {
    if (err) {
      res.status(500).send('Post failed!')
    }
    res.sendStatus(202);
  });
})

app.patch('/pets/:id', (req, res) => {
  const id = req.params.id;
  const update = req.body;
  const column = Object.keys(update)[0];
  const value = Object.values(update)[0];
  console.log(column, value);
  pool.query(`UPDATE pets SET ${column} = '${value}' WHERE id = ${id}`, (err) => {
    if (err) {
      res.status(500).send('Update failed!')
    }
  });
  res.sendStatus(202);
})

app.delete('/pets/:id', (req, res) => {
  const id = req.params.id;
  pool.query(`SELECT * FROM pets WHERE id = '${id}'`, (err, data) => {
    if (err) {
      res.status(404).send("Resource doesn't exist.")
    }
    const deleted = data.rows[0];
    delete deleted.id;
    pool.query(`DELETE FROM pets WHERE id = ${id}`);
    res.status(200).send(deleted);
  })
})