import {createContext} from 'react'

function noop () {}

export const AuthContext = createContext({
  id: null,
  name: null,
  token: null,
  login: noop,
  logout: noop,
  isLogin: false,
  recipient: null
})