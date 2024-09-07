import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createUser } from '../../redux/state/user';
import { useNavigate } from 'react-router-dom';
import { PrivateRoutes } from '../../models/routes';
import APIs from '../../services/APIs';
import { Toaster, toast } from 'sonner'

import'./Login.css'

const Login = () => {

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

    const navigate = useNavigate()
    const dispatch = useDispatch();
    const login = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      try {
        let result: any = await APIs.login({email, password})
        if(result.status == 'warning'){
          return toast.warning(result.message)
  
        }
        if(result.status == 'success') {
          dispatch(createUser(result.data))
          localStorage.setItem('token-eco', result.token)
          navigate(`/${PrivateRoutes.PRIVATE}`, { replace: true }) 
        }
       
      } catch (error) {
        toast.error("Ocurri un error al iniciar sesion")
      }
    
    }

  return (
    <div className='login'>
      <Toaster richColors expand={false} position="top-right" />
      <div className='login__container'>
        <div className='left'>
          <div className='left__container'>

          </div>
        </div>
        <div className='right'>
          <form className='form__login' onSubmit={login}>
            <div className='session__credentials'>
              <div>
                <p className=''>Usuario:</p>
                <p className='user'>Luislopeztest@gmail.com</p>
              </div>
              <div>
                <p className=''>Contraseña:</p>
                <p className='password'>Luis123</p>
              </div>
            </div>
              <div>
                  <div>
                      <label className='label__general'>Usuario</label>
                      <div className='inputs__general_icons'>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-287q5 0 10.5-1.5T501-453l283-177q8-5 12-12.5t4-16.5q0-20-17-30t-35 1L480-520 212-688q-18-11-35-.5T160-659q0 10 4 17.5t12 11.5l283 177q5 3 10.5 4.5T480-447Z"/></svg>
                        <input className='inputs__generic' value={email} onChange={(e) => setEmail(e.target.value)} type="text" placeholder='Correo electronico'/>
                      </div>
                  </div>
                  <div>
                      <label className='label__general'>Contraseña</label>
                      <div className='inputs__general_icons'>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M280-240q-100 0-170-70T40-480q0-100 70-170t170-70q81 0 141.5 45.5T506-560h334q33 0 56.5 23.5T920-480q0 36-25 58t-55 22v80q0 33-23.5 56.5T760-240q-33 0-56.5-23.5T680-320v-80H506q-24 69-84.5 114.5T280-240Zm0-160q33 0 56.5-23.5T360-480q0-33-23.5-56.5T280-560q-33 0-56.5 23.5T200-480q0 33 23.5 56.5T280-400Z"/></svg>
                        <input className='inputs__generic' value={password} onChange={(e) => setPassword(e.target.value)} type="text" placeholder='Contraseña'/>
                      </div>
                  </div>
              </div>
              <div className='btn__login'>
                  <button className='btn__general-purple' type="submit">Iniciar sesión</button>
              </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
