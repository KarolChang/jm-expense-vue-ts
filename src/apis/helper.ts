import axios from 'axios'

const baseURL = 'http://jm-expense-mysql.herokuapp.com'
export const apiHelper = axios.create({
  baseURL
})
