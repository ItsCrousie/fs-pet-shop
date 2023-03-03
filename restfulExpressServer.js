import express from 'express';
import pg from 'pg';

const app = express();
const port = 3000;
app.use(express.json());

const { Pool } = pg;
const pool = new Pool({
  host: '127.0.0.1',
  port: '5432',
  database: 'petshop',
  user: 'postgres',
  password: 'password'
})

app.get('/pets', (req, res) => {
  pool.query('SELECT * FROM pets', (err, data) => {
    if (err) {
      console.log(err.stack)
    }
    res.status(200).send(data.rows)
  })
});

app.get('/pets/:id', (req, res) => {
  const id = req.params.id
  pool.query(`SELECT * FROM pets WHERE id = '${id}'`, (err, data) => {
    if (err) {
      console.log(err.stack)
    }
    res.status(200).send(data.rows[0])
  })
})

app.post('/pets', (req, res) => {
  const age = Number.parseInt(req.body.age)
  const {name, kind} = req.body
  pool.query(`INSERT INTO pets (age, kind, name) VALUES ('${age}', '${kind}', '${name}')`)
  res.sendStatus(202)
})

// app.patch('/pets/:id', (req, res))

// app.delete()

app.listen(port,() => {
  console.log(`Listening on port ${port}`)
});