const express = require('express')
const app = express()
const PORT = 3001
app.use(express.json())
let persons = [
  {
    name: 'Arto Hellas',
    number: '040-123456',
    id: 1,
  },
  {
    name: 'Ada Lovelace',
    number: '040-123457',
    id: 2,
  },
  {
    name: 'Dan Abramov',
    number: '040-123458',
    id: 3,
  },
  {
    name: 'Mary Poppendieck',
    number: '040-123459',
    id: 4,
  },
  {
    name: 'Limo Vincent Kiprutod',
    number: '3456788',
    id: 5,
  },
  {
    name: 'Limo Vincent',
    number: '040 - 12345645dd',
    id: 6,
  },
]

app.get('/info', (req, res) => {
  res.send(
    `<p>phonebook has constact for ${
      persons.length
    } people</p><p> ${new Date()}</p>`
  )
})

//GETINFO
app.get('/', (req, res) => res.send('<h1>Hello homepage</h1>'))
app.get('/api/persons', (req, res) => {
  res.json(persons)
})

//POST
app.post('/api/persons', (req, res) => {
  const body = req.body
  const name = body.name
  const number = body.number

  if (name && number) {
    const nameFound = persons.find((p) => p.name === name)
    const numberFound = persons.find((p) => p.number === number)
    if (nameFound) {
      return res.status(400).json({ error: 'name must be unique' })
    } else if (numberFound) {
      return res.status(400).json({ error: 'number must be unique' })
    } else {
      const person = {
        name: name,
        number: number,
        id: persons.length + Math.floor(Math.random() * 1000),
      }
      persons = [...persons, person]
      return res.json(person)
    }
  } else {
    return res.status(400).json({
      error: 'name or number is missing',
    })
  }
})

//GETALL
app.get('/api/persons', (req, res) => {
  res.json(persons)
})

//GETPERSON
app.get('/api/persons/:id', (req, res) => {
  const _id = Number(req.params.id)
  const person = persons.find(({ id }) => id === _id)
  if (person) {
    res.json(person)
  } else {
    res.status(204).end()
  }
})

//DELETEPERSON*
app.delete('/api/persons/:id', (req, res) => {
  const _id = Number(req.params.id)
  persons = persons.filter(({ id }) => id !== _id)
  res.status(404).end()
})

// LISTEN
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
