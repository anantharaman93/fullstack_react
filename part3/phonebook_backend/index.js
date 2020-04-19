const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const Person = require("./models/persons");

const app = express();

morgan.token("post-data", (req, res) =>
  req.method === "POST" ? JSON.stringify(req.body) : ""
);

app.use(cors());
app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms - :post-data"
  )
);
app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>");
});

app.get("/api/persons", (req, res) => {
  Person.find({}).then((persons) => {
    res.json(persons.map((person) => person.toJSON()));
  });
});

app.get("/info", (req, res) => {
  Person.count().then((count) => {
    res.write(`Phone book has info for ${count} people`);
    res.write("\n\n");
    res.write(new Date().toUTCString());
    res.end();
  });
});

app.get("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  Person.findById(id)
    .then((person) => res.json(person.toJSON()))
    .catch((_error) => res.status(404).end());
});

app.delete("/api/persons/:id", (req, res, next) => {
  const id = req.params.id;
  Person.findByIdAndDelete({ _id: id })
    .then((_result) => res.status(204).end())
    .catch((error) => next(error));
});

app.post("/api/persons", (request, response) => {
  const body = request.body;

  const name = body.name;
  const number = body.number;

  if (!name) {
    return response.status(400).json({
      error: "name missing",
    });
  }
  if (!number) {
    return response.status(400).json({
      error: "number missing",
    });
  }

  Person.findOne({ name: name }).then((result) => {
    if (result === null) {
      const person = new Person({ name, number });
      person.save().then((savedPerson) => {
        response.json(savedPerson.toJSON());
      });
    } else {
      response.status(400).json({
        error: `Name must be unique for ${result.name}`,
      });
    }
  });
});

const PORT = 3001;
app.listen(PORT);
