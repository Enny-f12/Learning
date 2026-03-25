const notesRouter = require('express').Router()
const notesController = require('../controllers/notes')

notesRouter.get('/', notesController.getAllNotes)
notesRouter.get('/:id', notesController.getNoteById)
notesRouter.post('/', notesController.createNote)
notesRouter.delete('/:id', notesController.deleteNote)
notesRouter.put('/:id', notesController.updateNote)

module.exports = notesRouter