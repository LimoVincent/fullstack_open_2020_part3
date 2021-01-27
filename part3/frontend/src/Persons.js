import React from 'react'

export const Persons = ({ persons, handleDelete }) => {
  return (
    <div className='border'>
      <ol>
        {persons.map(({ name, number, id }) => (
          <li
            key={name}
            className=' d-flex  m-auto justify-content-between align-items-center'
          >
            <div>
              <p>{name}</p>
            </div>

            <div>
              <p>{number} </p>
            </div>
            <div>
              <button
                className='btn btn-danger rounded '
                type='submit'
                onClick={() => handleDelete(id)}
              >
                delete
              </button>
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}
