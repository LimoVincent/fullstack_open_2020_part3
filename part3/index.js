const express = require('express')
const app = express()
const PORT = 3001
const persons = [
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

const info = persons.length
const date = new Date()

app.get('/', (req, res) => res.send('<h1>Hello homepage</h1>'))

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/info', (req, res) => {
  res.send(`<p>phonebook has constact for ${info} people</p><p> ${date}</p>`)
  
  
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
