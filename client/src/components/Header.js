import {useContext } from 'react'
import { AuthContext } from '../context/authContext'
import { useAuth } from '../hooks/auth.hook'
import {useNavigate} from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import chatLogo from '../assets/chat.png'
import messageLogo from '../assets/message.png'
import logoutLogo from '../assets/logout.png'
import {Link} from 'react-router-dom'
import Button from 'react-bootstrap/Button'

const Header = () => {
  const auth = useContext(AuthContext)
  const {logout} = useAuth()

  const navigate = useNavigate()

  const handleLogoutClick = (e) => {
    e.preventDefault()
    auth.logout()
    navigate('/')
  }

  return (
    <header 
      className='position-fixed fixed-top fixed-right fixed-left ' 
      style={{height: '40px !important', zIndex: '1'}}
    >
      <Navbar  
        className='p-2 d-flex flex-row justify-content-between align-items-center' 
        bg='light'
        style={{width: '100%'}}
      >
          <Link   
            to='/chat'
          >
            <img
              src={chatLogo}
              width='30'
              height='30'
              alt='User logo'
            />
          </Link>

          <Link   
            to='/'
          >
            <img
              src={messageLogo}
              width='30'
              height='30'
              alt='Message logo'
            />
          </Link>

          <Button onClick={handleLogoutClick} variant='light'>
            <img
              src={logoutLogo}
              width='30'
              height='30'
              alt='Logout logo'
            />
          </Button>
      </Navbar>

    </header>
  )
}

export default Header