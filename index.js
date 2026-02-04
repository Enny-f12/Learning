require('dotenv').config()
const express = require('express')

const Person = require('./models/person')
const app = express()
app.use(express.json())
app.use(express.static('dist'))


let persons = [
    {
        id: "1",
        name: "Arto Hellas",
        number: "040-123456"
    },
    {
        id: "2",
        name: "Ada Lovelace",
        number: "39-44-5323523",

    },
    {
        id: "3",
        name: "Dan Abramov",
        number: "12-43-234345",

    },
    {
        id: "4",
        name: "Mary Poppendieck",
        number: "39-23-6423122",

    }

]

app.get('/', (request, response) => {
    response.send('<h1>Exercise 3.5</h1>')
})

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
    response.json(persons)
    })
})
app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id).then(person => {
    response.json(person)
    })
})



const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})