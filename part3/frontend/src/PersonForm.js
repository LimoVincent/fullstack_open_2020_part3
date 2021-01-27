import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

export const PersonForm = ({
  handleName,
  newName,
  newNumber,
  handleNumber,
  handleSubmit,
  message,
  success,
}) => (
  <div>
    <h2>Add New Contact</h2>
    <form>
      <div>
        <label htmlFor='name' className='col-sm-2 col-form-label'>
          Name :
        </label>
        <input
          className='form-control col-6'
          name='name'
          value={newName}
          onChange={handleName}
        ></input>
      </div>

      <div>
        <label htmlFor='number' className='col-sm-2 col-form-label'>
          Number :
        </label>
        <input
          className='form-control col-6'
          name='number'
          value={newNumber}
          onChange={handleNumber}
        />
      </div>
      <div className=' h6 continer-fluid my-2 col-6 text-danger font-weight-bold'>
        {message}
      </div>
      <div>
        <button
          className='btn px-5 m-3 btn-success rounded '
          type='submit'
          onClick={handleSubmit}
        >
          Add Contact
        </button>
      </div>
      <div className=' h6  continer-fluid  my-2  col-6 text-success font-weight-bold '>
        {success}
      </div>
    </form>
  </div>
)
