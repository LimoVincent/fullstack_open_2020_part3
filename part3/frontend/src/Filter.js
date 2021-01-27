import React from 'react'

export const Filter = ({ handleChangeSearch, search }) => {
  return (
    <div>
      <h3>Filter Contact</h3>
      <label className='col-sm-2  col-form-label' htmlFor='search'>
        Filter shown with:
      </label>
      <input
        className='form-control col-6'
        name='search'
        value={search}
        onChange={handleChangeSearch}
      />
    </div>
  )
}
