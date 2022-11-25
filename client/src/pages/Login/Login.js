import {useState, useContext} from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { AuthContext } from '../../context/authContext'
import {useHttp} from '../../hooks/http.hook'
import {socket} from '../../constans/socket'

const Login = () => {
  const auth = useContext(AuthContext)
  const {request} = useHttp()
  const [name, setName] = useState('')

  const handleLoginButtonClick = async (e) => {
    e.preventDefault()
    const modName = name[0].toUpperCase() + name.slice(1)
    const data = await request('/api/auth/login', 'POST', {name: modName})
    auth.login(data.name, data.token, data.id)
    socket.emit('init', data.name)
  }   

  return (
    <Form 
      className='d-flex flex-column justify-content-center align-items-center border p-3 rounded shadow-lg mb-5' 
      style={{width: '30%'}}
    > 
      <Form.Group>
        <h1 className='text-center' style={{fontSize: '25px'}}>Login</h1>
        <Form.Control 
          type='text' 
          placeholder='Name' 
          name='name' 
          onChange={(event) => setName((event.target.value).toLowerCase())}
        />
      </Form.Group>

      <Button 
        variant='dark'
        className='mt-2' 
        type='submit'
        onClick={handleLoginButtonClick}
      >
        Enter
      </Button>

    </Form>
  )
}

export default Login