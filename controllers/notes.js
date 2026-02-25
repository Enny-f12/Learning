const Note = require('../models/note')

// GET all notes
const getAllNotes = (request, response) => {
  Note.find({}).then(notes => {
    response.json(notes)
  })
}

// GET single note
const getNoteById = (request, response, next) => {
  Note.findById(request.params.id)
    .then(note => {
      if (note) response.json(note)
      else response.status(404).end()
    })
    .catch(error => next(error))
}

// POST a new note
const createNote = (request, response, next) => {
  const body = request.body
  if (!body.content) {
    return response.status(400).json({ error: 'content missing' })
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
  })

  note.save()
    .then(savedNote => response.json(savedNote))
    .catch(error => next(error))
}

// DELETE a note
const deleteNote = (request, response, next) => {
  Note.findByIdAndDelete(request.params.id)
    .then(() => response.status(204).end())
    .catch(error => next(error))
}

// PUT (Update) a note
const updateNote = (request, response, next) => {
  const { content, important } = request.body
  Note.findByIdAndUpdate(
    request.params.id,
    { content, important },
    { new: true, runValidators: true, context: 'query' }
  )
    .then(updatedNote => {
      if (updatedNote) response.json(updatedNote)
      else response.status(404).end()
    })
    .catch(error => next(error))
}

module.exports = {
  getAllNotes,
  getNoteById,
  createNote,
  deleteNote,
  updateNote
}