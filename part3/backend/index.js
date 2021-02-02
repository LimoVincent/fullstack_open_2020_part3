const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const app = express()
const cors = require('cors')
require('dotenv').config()
const Person = require('./models/person')
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())
app.use(express.static('build'))

morgan.token('data', (req) => JSON.stringify(req.body))
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :data')
)

mongoose.Promise = global.Promise

//GETAll
app.get('/api/persons', (req, res) => {
  Person.find({}).then((persons) => {
    res.json(persons)
  })
})

//POST
app.post('/api/persons', (req, res) => {
  const body = req.body
  const name = body.name
  const number = body.number

  if (name && number) {
    const person = new Person({
      name: name,
      number: number,
      date: new Date().toLocaleDateString('us'),
    })
    person.save().then((savedperson) => {
      res.json(savedperson)
      // mongoose.connection.close()
    })
  } else {
    return res.status(400).json({
      error: 'name or number is missing',
    })
  }
})

//GETPERSON
app.get('/api/persons/:id', (req, res) => {
  Person.findById(req.params.id).then((person) => {
    res.json(person)
    // mongoose.connection.close()
  })
})

//DELETEPERSON*
app.delete('/api/persons/:id', (req, res) => {
  Person.findByIdAndDelete(req.params.id).then((deletedperson) => {
    res.json(deletedperson)
    // mongoose.connection.close()
  })
})

// LISTEN
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
