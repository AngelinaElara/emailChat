import {useEffect, useState, useCallback} from 'react'
import Messages from '../../components/Messages'
import { useHttp } from '../../hooks/http.hook'
import { useAuth } from '../../hooks/auth.hook'

const Chat = () => {
  const [data, setData] = useState({})
  const [currName, setCurrname] = useState(JSON.parse(localStorage.getItem('userData')).userName || {})
  const {request} = useHttp()
  const {token} = useAuth()

  const fetchUsers = useCallback(async () => {
    try {
      let getData = await request(`/dialog/myMessages/${currName}`, 'GET')
      setData(getData) 
    } catch (e) {
      console.error(e)
    } 
  }, [request, token])

  useEffect(() => {
    fetchUsers()
  }, [fetchUsers]) 

  return (
    <div style={{width: '100%'}}>
      {data?.length 
        ? <Messages data={data}/>
        : <h1>You have not received messages from users yet...</h1>
      }
    </div>
  ) 
}

export default Chat  