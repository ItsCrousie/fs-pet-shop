import express from 'express';
import fs from 'fs';

const app = express();
const port = 3000;
app.use(express.json());

app.get('/pets', (req, res) => {
  fs.readFile('pets.json', 'utf8', (err, petsJSON) => {
    const pets = JSON.parse(petsJSON)
    res.status(200).send(pets);
  })
});

// app.get()

app.post('/pets', (req, res) => {
  const age = Number.parseInt(req.body.age)
  const {name, kind} = req.body
  const newPet = { name, kind, age }

  fs.readFile('pets.json', 'utf8', (err, petsJSON) => {
    let pets = JSON.parse(petsJSON);
    console.log(pets)
    pets.indexOf(newPet) === -1
    ? pets.push(newPet)
    : res.status(409).send(`${newPet.name} already exists. :)`)
    // fs.writeFile('pets.json', data, () => {
    //   res.status(202).send('Accepted!')
    // });
  })
})

// app.patch()

// app.delete()

app.listen(port,() => {
  console.log(`Listening on port ${port}`)
});