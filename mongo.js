require('dotenv').config() // 1. Load the variables at the very top
console.log("Database URL loaded:", process.env.MONGODB_URI ? "YES" : "NO");
const mongoose = require('mongoose')

// Use the variable from .env
const url = process.env.MONGODB_URI 

mongoose.set('strictQuery', false)

// It's better to handle the connection this way
mongoose.connect(url)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

const note = new Note({
  content: 'HTML is easy',
  important: true,
})

note.save().then((result) => {
  console.log('note saved!')
  mongoose.connection.close()
})