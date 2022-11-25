import {useState, useEffect, useCallback, useContext} from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Typeahead } from 'react-bootstrap-typeahead'
import { Link } from 'react-router-dom'
import { useAuth } from '../../hooks/auth.hook'
import { useHttp } from '../../hooks/http.hook'
import { AuthContext } from '../../context/authContext'
import { socket } from '../../constans/socket'


const Main = () => {
  const [currName, setCurrname] = useState(JSON.parse(localStorage.getItem('userData')).userName || {})
  const [notification, setNotification] = useState('')
  const [singleSelections, setSingleSelections] = useState([])
  const [dataNames, setDataNames] = useState([])
  const [messages, setMessages] = useState({
    text:'', header: '', sender: '', recipient: ''
  })

  const {request} = useHttp()
  const {token} = useAuth()
  const auth = useContext(AuthContext)

  const input = document.querySelector('.rbt-input-main')

  // Getting all users from the database
  const fetchUsers = useCallback(async () => {
    try {
      let data = await request('/api/auth', 'GET')
      setDataNames(data)
    } catch (e) {
      console.error(e)
    }
  }, [token, request])

  const handleMessageDataChange = (event) => {
    setMessages({ ...messages, [event.target.name]: event.target.value, sender:  JSON.parse(localStorage.getItem('userData')).userName})
  }

  const handleSetMessageClick = async (event) => {
    try {
      event.preventDefault()
      const data = await request('/dialog/sendMessage', 'POST', {...messages})
      const $form = document.querySelector('.form').reset() 
      setSingleSelections([])
      setNotification('Message has been sent')
      setTimeout(() => {
        setNotification('')
      }, 2000)
    } catch (err) {
      console.error(err)
    } 
  }

  useEffect(() => { 
    fetchUsers()
  }, [fetchUsers]) 

  useEffect(() => {
    socket.emit('init', currName)
  }, [currName.length])

  // track changes in typehead
  useEffect(() => { 
    const nameSelect = singleSelections.map(el => el.name).join('')
    setMessages({recipient: nameSelect})
    auth.recipient = nameSelect
  }, [singleSelections]) 

  useEffect(() => {
    auth.recipient = input?.value
  }, [input?.value])

  return (   
    <div style={{zIndex: '1'}} className='mt-5'>
      <h1>Send a message</h1> 
      <p style={{color: 'green'}} className='text-center'>{notification}</p>

      {singleSelections.length 
        ? <Link 
            className='link-dark' 
            to={`/personalMessages`}
          > 
            View all messages sent by {singleSelections.map(el => el.name).join('')}
          </Link> 
        : ''
      } 

      <Form className='form d-flex flex-column justify-content-center align-items-center gap-2 border rounded shadow-lg p-5' style={{width: '500px'}}>
        <Form.Group className='mb-3' style={{width: '100%'}}>
          <Form.Label style={{fontWeight: '600'}}>Recipient</Form.Label>
            <Typeahead 
              id='typeahead'  
              labelKey='name'
              onChange={setSingleSelections}
              options={dataNames}
              placeholder='Choose a state...'
              selected={singleSelections}
              name='users'
            />
          </Form.Group>
 
        <Form.Group className='mb-2' style={{width: '100%'}}>
          <Form.Label style={{fontWeight: '600'}}>Header</Form.Label>
          <Form.Control 
            type='text'  
            placeholder='Header' 
            name='header'
            onChange={handleMessageDataChange}
          />
        </Form.Group>

        <Form.Group className='mb-2' style={{width: '100%'}}>
          <Form.Label style={{fontWeight: '600'}}>Message</Form.Label>
          <Form.Control 
            as='textarea'  
            style={{height: '150px'}}
            name='text'
            onChange={handleMessageDataChange}
          />
        </Form.Group>

        <Button 
          variant='dark' 
          type='submit' 
          style={{width: '250px'}}
          onClick={handleSetMessageClick}
        >
          Send
        </Button>
      </Form>
    </div>
  )
} 

export default Main