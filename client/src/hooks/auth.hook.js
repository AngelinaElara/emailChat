import {useState, useCallback, useEffect} from 'react'

const storageName = 'userData'

export const useAuth = () => {
  const [userName, setUserName] = useState(null)
  const [token, setToken] = useState(null)
  const [id, setId] = useState(null)

  const login = useCallback((name, jwtToken, userId) => {
    setId(userId)
    setToken(jwtToken)
    setUserName(name)
 

    localStorage.setItem(storageName, JSON.stringify({
      userName: name, token: jwtToken, id: userId
    }))
  }, [])

  const logout = useCallback(() => {
    setToken(null)
    setUserName(null)
    setId(null)

    localStorage.removeItem(storageName)
  }, [])

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName) || '{}')

    if(data && data.token) {
      login(data.userName, data.token, data.id)
    }
  }, [login])

  return {userName, login, logout, token, id}  
}