require('dotenv').config() 
console.log("Database URL loaded:", process.env.MONGODB_URI ? "YES" : "NO");
const mongoose = require('mongoose')


const url = process.env.MONGODB_URI 

mongoose.set('strictQuery', false)


mongoose.connect(url)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })
// schema and model

// schema serves as the blueprint or rule book for data structure in a MongoDB collection.
const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)
// model acts like the constructor function for creating and managing documents in a specific MongoDB collection.
//const note = new Note({
//  content: 'HTML is easy',
//  important: true,
//})
// fetching all documents from database
Note.find({important: true }).then(result => {
  result.forEach(note => {
    console.log(note)
  })
  mongoose.connection.close()
})
// saving a document
//note.save().then((result) => {
 // console.log('note saved!')
 // mongoose.connection.close()
//})