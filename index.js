const express = require("express");
var cors = require('cors')
const app = express();
app.use(express.json());
app.use(cors())

let notes = [
    {
        id: 1,
        name: "Arto Hellas",
        phone: "040-123456",
    },
    {
        id: 2,
        name: "jose Hellas",
        phone: "070-123456",
    },
];

const generateId = () => {
    const max = 100000;
    const id = Math.floor(Math.random() * max);
    if (!notes.find((n) => n.id)) {
        generateId();
    } else {
        return id;
    }
};

app.get("/", (resquest, response) => {
    response.send("<h1>App</h1>");
});
app.get("/info", (resquest, response) => {
    response.send(`<p>Phonebook has info for 2 people</p> <p>${new Date()}</p>`);
});

app.get("/api/notes", (resquest, response) => {
    response.json(notes);
});

app.get("/api/notes/:id", (resquest, response) => {
    
    const id = Number(resquest.params.id);
    const person = notes.filter((person) => person.id === id);
    const noteInclude = notes.some((person) => person.id === id);
    console.log(noteInclude)
    if (!noteInclude) {
        response.status(404).end();
    } else {
        response.send(person);
    }
});

app.post("/api/notes", (request, response) => {
    const data = request.body;
    console.log('datos',data)
  
    if(!data.name){
      return response.status(400).json({
        error: 'content missing'
      })
    }
  
    const note = {
      name: data.name || false,
      phone: data.phone || 0,
      id: generateId(),
    }
    notes = notes.concat(note)
    response.json(note)
  
  });

PORT = 3011;
app.listen(PORT, () => {
    console.log(`Started at ${PORT}`);
});
