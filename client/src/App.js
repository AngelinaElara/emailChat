import {useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import {useAuth} from './hooks/auth.hook'
import { AuthContext } from './context/authContext'
import { useRoutes } from './routes/routes'
import {socket} from './constans/socket'
import Swal from 'sweetalert2'
 

const App = () => {
  const {userName, login, logout, token, id, recipient, msgsToSender} = useAuth()
  const isAuth = !!token
  const routes = useRoutes(isAuth)

  useEffect(() => {
    socket.on('messageNotify', (text, header, sender) => {
      Swal.fire(
        {
          title: `You have a message from ${sender}`, 
          header,
          text
        }
      ) 
    })
  }, [] )
 
  return (
    <AuthContext.Provider value={{
      id, userName, token, login, logout, isAuth , recipient, msgsToSender
    }}>
      <div 
        className='bg-light position-fixed fixed-top fixed-right fixed-bottom fixed-left d-flex flex-column justify-content-center align-items-center'
      >
        {routes}
      </div>
    </AuthContext.Provider> 
  )
}

export default App  