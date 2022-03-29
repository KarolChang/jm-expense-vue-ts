import axios from 'axios'

const baseURL = 'http://jm-expense-mysql.herokuapp.com'
export const apiHelper = axios.create({
  baseURL
})

const baseURL_Line = 'http://linebot20220114.herokuapp.com'
export const apiHelperLine = axios.create({
  baseURL: baseURL_Line
})

export interface Message {
  type: string
  text: string
}

export interface LineInput {
  to: string | string[]
  messages: Message | Message[]
}
