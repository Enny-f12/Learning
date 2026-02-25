require('dotenv').config()
const express = require('express')
const app = express()
const notesRouter = require('./routes/notes')
const apiRoutes = require('./routes/apiRoutes')

app.use(express.json())
app.use(express.static('dist'))


app.use('/api/notes', notesRouter)
app.use('/api', apiRoutes)
app.use('/techy', apiRoutes)

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})




// Error handling
const errorHandler = (error, request, response, next) => {
  console.error(error.message)
  if (error.name === 'CastError') return response.status(400).send({ error: 'malformed ID' })
  if (error.name === 'ValidationError') return response.status(400).json({ error: error.message })
  if (error.name === 'AxiosError') return response.status(error.response?.status || 500).json({ error: 'External API failure', details: error.message })
  next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))