import {useState, useEffect, useCallback} from 'react'
import { useHttp } from '../hooks/http.hook'
import Main from '../pages/Main'
import Chat from '../pages/Chat'
import Login from '../pages/Login'
import Header from '../components/Header'
import {Routes, Route} from 'react-router-dom'
import PersonalMessages from '../pages/PersonalMessages'

export const useRoutes = (isAuth) => {
  const [data, setData] = useState([])

  const { request} = useHttp()

  // Getting all users from the database
  const fetchUsers = useCallback(async () => {
    try {
      let data = await request('/api/auth', 'GET')
      setData(data)
    } catch (e) {
      console.error(e)
    }
  }, [request])

  useEffect(() => { 
    fetchUsers()
  }, [fetchUsers])
 
  if (isAuth) {
    return (
      <> 
        <Header />
          <div style={{marginTop: '60px', width: '100%'}} className='d-flex flex-column justify-content-center align-items-center'>
            <Routes>
              <Route path='/chat' element={<Chat data={data}/>} />
              <Route path='*' element={<Main data={data}/>} />
              <Route path='/' element={<Main data={data}/>} />
              <Route path='/personalMessages' element={<PersonalMessages />} />
            </Routes>
          </div>
      </>
    )
  }

  return (
    <Routes>
      <Route path='/' element={<Login />} />
    </Routes>
  )
}