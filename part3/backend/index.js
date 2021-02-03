if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

const app = express()

//middlewares
app.use(express.static('build'))
app.use(express.json())
morgan.token('data', (req) => JSON.stringify(req.body))
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :data')
)
app.use(cors())

//info
app.get('/info', (req, res, next) => {
  Person.find({})
    .then((persons) => {
      res.send(
        `<p>phonebook has constact for ${
          persons.length
        } people</p><p> ${new Date()}</p>`
      )
    })
    .catch((error) => next(error))
})

//GETAll
app.get('/api/persons', (req, res, next) => {
  Person.find({})
    .then((persons) => res.json(persons.map((person) => person.toJSON())))
    .catch((error) => next(error))
})

//POST
app.post('/api/persons', (req, res, next) => {
  const body = req.body
  const name = body.name
  const number = body.number

  if (name && number) {
    const person = new Person({
      name: name,
      number: number,
      date: new Date().toLocaleDateString('us'),
    })

    person
      .save()
      .then((savedperson) => res.json(savedperson.toJSON()))
      .catch((error) => next(error))
  } else {
    return res.status(400).json({
      error: 'name or number is missing',
    })
  }
})

//GETPERSON
app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then((person) => {
      if (person) {
        res.json(person.toJSON())
      } else {
        res.status(404).send({ error: 'No such person' }).end()
      }
    })
    .catch((error) => next(error))
})

//DELETEPERSON*
app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(204).end()
    })
    .catch((error) => next(error))
})

//PUT
app.put('/api/persons/:id', (req, res, next) => {
  const body = req.body

  const person = {
    name: body.name,
    number: body.number,
  }

  Person.findByIdAndUpdate(req.params.id, person, { new: true })
    .then((updatedPerson) => res.json(updatedPerson))
    .catch((error) => next(error))
})

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, req, res, next) => {
  console.error(error.message)

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return res.status(400).send({ error: 'invalid id' })
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  }
  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
// LISTEN
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
