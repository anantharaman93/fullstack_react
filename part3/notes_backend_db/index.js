const express = require("express");
const cors = require("cors");
require("dotenv").config();
const Note = require("./models/note");

const app = express();

const requestLogger = (request, response, next) => {
  console.log("Method:", request.method);
  console.log("Path:  ", request.path);
  console.log("Body:  ", request.body);
  console.log("---");
  next();
};

app.use(cors());
app.use(express.json());
app.use(requestLogger);

app.get("/", (_req, res) => {
  res.send("<h1>Hello World!</h1>");
});

app.get("/api/notes", (_request, response) => {
  Note.find({}).then((notes) => {
    response.json(notes.map((note) => note.toJSON()));
  });
});

app.get("/api/notes/:id", (request, response) => {
  const id = request.params.id;
  Note.findById(id).then((note) => {
    response.json(note.toJSON());
  });
});

app.delete("/api/notes/:id", (request, response, next) => {
  const id = request.params.id;
  Note.findByIdAndRemove(id)
    //  Note.findOneAndDelete({ _id: id })
    .then((_result) => {
      console.log(_result);
      response.status(204).end();
    })
    .catch((error) => next(error));
});

app.put("/api/notes/:id", (request, response, next) => {
  const body = request.body;

  const note = {
    content: body.content,
    important: body.important,
  };

  Note.findByIdAndUpdate(request.params.id, note, { new: true })
    .then((updatedNote) => {
      response.json(updatedNote.toJSON());
    })
    .catch((error) => next(error));
});

app.post("/api/notes", (request, response) => {
  const body = request.body;

  if (!body.content) {
    return response.status(400).json({
      error: "content missing",
    });
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date(),
  });

  note.save().then((savedNote) => {
    response.json(savedNote.toJSON());
  });
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
