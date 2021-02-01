import axios from 'axios'
const url = '/api/persons'

export const getAll = () => {
  const request = axios.get(url)
  return request.then((response) => response.data)
}

export const create = (newObject) => {
  const request = axios.post(url, newObject)
  return request.then((response) => response.data)
}

export const update = (id, newObject) => {
  const request = axios.put(`${url}/${id}`, newObject)
  return request.then((response) => response.data)
}

export const deleted = (id, Object) => {
  const request = axios.delete(`${url}/${id}`, Object)
  return request.then((response) => response.data)
}
