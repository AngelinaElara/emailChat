import { useContext, useEffect, useState, useCallback} from 'react'
import Messages from '../../components/Messages'
import { AuthContext } from '../../context/authContext'
import { useHttp } from '../../hooks/http.hook'
import { useAuth } from '../../hooks/auth.hook'

const PersonalMessages = () => {
  const [currName, setCurrName] = useState(JSON.parse(localStorage.getItem('userData')).userName || {})
  const [data, setData] = useState({})

  const auth = useContext(AuthContext)
  const {request} = useHttp()
  const {token} = useAuth()

  const handleGetPrivateMessages = useCallback(async () => {
    try {
      const getData = await request(`/dialog/sentMessages/?currName=${currName}&recName=${auth.recipient}`, 'GET')
      setData(getData) 
    } catch (err) {
      console.error(err)
    } 
  }, [request, token])

  useEffect(() => { 
    handleGetPrivateMessages()
  }, [handleGetPrivateMessages]) 
  
  return ( 
    <div style={{width: '100%'}}>
      {data?.length 
        ? <Messages data={data}/>
        : <h1>You don't have any messages in common with this user</h1>
      }
    </div> 
  )
}

export default PersonalMessages