const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("Password should be provided as argument");
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://fullstack:${password}@cluster0-xmnej.mongodb.net/note-app?retryWrites=true&w=majority`;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
});

const Note = mongoose.model("Note", noteSchema);

const note1 = new Note({
  content: "HTML is Easy",
  date: new Date(),
  important: true,
});

const note2 = new Note({
  content: "Mongoose makes use of mongodb easy",
  date: new Date(),
  important: true,
});

const note3 = new Note({
  content: "Call-Back function sucks",
  date: new Date(),
  important: true,
});

note1.save().then((_response) => {
  console.log("Note 1 saved");
});

note2.save().then((_response) => {
  console.log("Note 2 saved");
});

note3.save().then((_response) => {
  console.log("Note 3 saved");
});

Note.find({ important: true }).then((result) => {
  result.forEach((note) => {
    console.log(note);
  });
  mongoose.connection.close();
});
