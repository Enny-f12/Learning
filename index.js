const express = require('express')
const morgan = require('morgan')
const app = express()
app.use(express.json())
app.use(morgan('tiny'))
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
  response.send('<h1>Implementing morgan using tiny format</h1>')
})

app.get('/api/notes', (request, response) => {
  response.send(notes)
})



const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)