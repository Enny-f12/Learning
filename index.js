require('dotenv').config()
const express = require('express')
const Note = require('./models/note')
const app = express()
app.use(express.json())
app.use(express.static('dist'))


let notes = [
  {
    id: "1",
    content: "HTML is easy",
    important: true
  },
  {
    id: "2",
    content: "Browser can execute only JavaScript",
    important: false
  },
  {
    id: "3",
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true
  }
]

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

//using database to fetch all notes
app.get('/api/notes', (request, response) => {
  Note.find({}).then(notes => {
    response.json(notes)
  })
})
//using database to fetch a single note by id
app.get('/api/notes/:id', (request, response) => {
  Note.findById(request.params.id)
    .then(note => {
      //handling errors
      if (note) {
        response.json(note)
      }
      else {
        response.status(404).end()
      }
    })
    .catch(error => {
      console.log(error)
      response.status(500).send({ error: "Malformatted ID" })
    })
})


app.delete('/api/notes/:id', (request, response, next) => {
  Note.findByIdAndDelete(request.params.id)
    .then(result => {
      return response.status(204).end()
    })
    //handling error using middleware
    .catch(error => next(error))

})

//creating a new note and saving to database
app.post('/api/notes', (request, response) => {
  const body = request.body
//validation
  if (!body.content) {
    return response.status(400).json({ error: 'content missing' })
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
  })

  note.save().then(savedNote => {
    response.json(savedNote)
  })
})

app.put('/api/notes/:id', (request, response, next) => {
  const { content, important } = request.body

  Note.findById(request.params.id)
    .then(note => {
      if (!note) {
        return response.status(404).end()
      }

      note.content = content
      note.important = important

      return note.save().then((updatedNote) => {
        response.json(updatedNote)
      })
    })
    .catch(error => next(error))
})

const errorHandler = (error, request, response, next) =>{
  console.error(error.message)

  if (error.name === "castError"){
    return response.status(400).send({error: "malformed ID"})
  }
  else if(error.name === "ValidationError"){
    return response.status(404).json({error: ""})
  }
  next(error)
}

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})