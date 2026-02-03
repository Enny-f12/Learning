const express = require('express')
const app = express()
app.use(express.json())
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
    response.json(persons)
})

app.post('/api/persons', (request, response) => {
    const body = request.body
    const name = body.name.trim()

    if (!name || !body.number) {
        return response.status(400).json({
            error: 'name or number missing'
        })
    }

    const formattedName = body.name
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ')

    const nameExists = persons.find(p => p.name === formattedName)

    if (nameExists) {
        return response.status(400).json({ error: 'name must be unique, add full name' })
    }

    const numberExists = persons.find(p => p.number === body.number)

    if (numberExists) {
        return response.status(400).json({ error: 'number must be unique, add another number' })
    }

    const person = {
        name: formattedName,
        number: body.number,
        id: String(Math.floor(Math.random() * 1000000))
    }

    persons = persons.concat(person)
    response.json(person)
})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)