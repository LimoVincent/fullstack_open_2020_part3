import React, { useEffect, useState } from 'react'
import { Filter } from './Filter'
import { PersonForm } from './PersonForm'
import { Persons } from './Persons'
import 'bootstrap/dist/css/bootstrap.min.css'
import { getAll, create, update, deleted } from './service'

const App = () => {
  const [newName, setNewName] = useState('')
  const [newNumber, setNumber] = useState('')
  const [search, setSearch] = useState('')
  const [message, setMessage] = useState('')
  const [success, setSuccess] = useState('')
  const [persons, setPersons] = useState([])

  useEffect(() => {
    getAll().then((data) => setPersons(data))
  }, [])

  const handleNumber = (e) => {
    setNumber(e.target.value)
  }

  const handleName = (e) => {
    setNewName(e.target.value)
  }

  const handleChangeSearch = (e) => {
    setSearch(e.target.value)
    const personsCopy = [...persons]
    let NewArry = personsCopy.filter((element) => element.name.includes(search))
    console.log(NewArry.length)
    setPersons(NewArry)
  }

  const handleDelete = (id) => {
    const name = persons.find((p) => id === p.id).name
    const confirm = window.confirm(`Do you really want to delete ${name}? `)
    if (confirm) {
      const person = persons.find((p) => p.id === id)
      deleted(id, person).then((deleted) => {
        setPersons(persons.filter((person) => person.id !== id))
        setMessage('')
        setSuccess(`Successfully deleted ${person.name}`)
      })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newPerson = { name: newName, number: newNumber }
    const personsCopy = [...persons]
    const foundName = personsCopy.find(({ name }) => newName === name)
    const foundNumber = personsCopy.find(({ number }) => newNumber === number)

    if (!newName || !newNumber) {
      if (!newName) {
        setMessage(`Name cannot be empty`)
      } else if (!newNumber) {
        setMessage(`Number cannot be empty `)
      }
    } else if (foundNumber) {
      setMessage(`${newNumber}  is already in the phonebook `)
    } else if (foundName) {
      const confirm = window.confirm(
        `${newName} is already added to phonebook, do you want to replcae the number? `
      )

      if (confirm) {
        const toupdate = personsCopy.find((person) => newName === person.name)
        const _id = toupdate.id
        const restpersons = personsCopy.filter(({ id }) => _id !== id)

        const updated = { ...toupdate, number: newNumber }
        update(_id, updated)
          .then((updated) => {
            setPersons([...restpersons, updated])
            setNewName('')
            setNumber('')
            setMessage('')
            setSuccess(`Successfully updated contact`)
          })
          .catch((error) => setMessage(error.response.data.error.toString()))
      }
    } else {
      try {
        create(newPerson)
          .then((data) => {
            setPersons([...personsCopy, data])
            setNewName('')
            setNumber('')
            setMessage('')
            setSuccess(`Successfully added ${newPerson.name}.`)
          })
          .catch((error) => setMessage(error.response.data.error.toString()))
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <div className='container-fluid w-100 h-100 m-0 p-0 bg-white'>
      <div
        className=' w-50 m-5 mx-auto container  rounded border'
        style={{
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#eeeeee',
        }}
      >
        <h1>Phonebook</h1>
        <ol>
          <li>
            <Filter {...{ handleChangeSearch, search }} />
          </li>
          <li>
            <PersonForm
              {...{
                newName,
                newNumber,
                handleNumber,
                handleName,
                handleSubmit,
                message,
                success,
              }}
            />
          </li>
          <li>
            <h2>Numbers: {persons.length}</h2>
            <Persons {...{ persons, handleDelete }} />
          </li>
        </ol>
      </div>
    </div>
  )
}

export default App
