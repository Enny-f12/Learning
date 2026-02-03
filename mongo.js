require('dotenv').config()
const mongoose = require('mongoose')

const url = process.env.MONGODB_URI 

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

// Logic to handle command line arguments (name and number)
const name = process.argv[2]   
const number = process.argv[3] 

if (!name || !number) {
  // If no name/number provided, list all entries
  console.log('phonebook:')
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
  })
} else {
  // If name and number are provided, save new entry
  const person = new Person({
    name: name,
    number: number,
  })

  person.save().then(() => {
    console.log(`added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
  })
}