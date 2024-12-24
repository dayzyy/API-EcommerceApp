import { createContext, useContext, useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";

import Swal from "sweetalert2";

import '../css/swal.css'

const AuthContext = createContext()

const API_URL = 'http://localhost:8000'

export const AuthProvider = ({children}) =>  {
  const [user, setUser] = useState(null)
  const [tokens, setTokens] = useState(null)
  const navigate = useNavigate()

  useEffect(_ => {
    const savedTokens = JSON.parse(localStorage.getItem('tokens'))

    if (savedTokens) setTokens(savedTokens)
  }, [])

  useEffect(_ => {
    if(tokens){
      localStorage.setItem('tokens', JSON.stringify(tokens))
      get_user()
    }
  }, [tokens])

  const register = async (email, password, password2) => {
    const response = await fetch(`${API_URL}/user/register/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email, password, password2})
    })

    if (response.status == 400){
      const data = await response.json()

      Swal.fire({
        width: '300',
        position: 'center',
        title: data.error,
        icon: 'error',
        showConfirmButton: false,
        timer: 2000,
      })
      return
    }

    if (response.status == 200){
      Swal.fire({
        width: '300',
        position: 'center',
        title: 'Successfuly registered!',
        icon: 'success',
        showConfirmButton: false,
        timer: 1000,
      })
      navigate('/login')
    }
  }

  const login = async (email, password) => {
    const response = await fetch(`${API_URL}/token/obtain/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email, password})
    })

    if (response.status == 400){
      Swal.fire({
        width: '300',
        position: 'center',
        title: 'Fill out the form!',
        icon: 'error',
        showConfirmButton: false,
        timer: 1000,
      })
      return
    }

    if (response.status == 401){
      Swal.fire({
        width: '300',
        position: 'center',
        title: 'Wrong credentials!',
        text: 'User not found',
        icon: 'error',
        showConfirmButton: false,
        timer: 1000,
      })
      return
    }

    if (response.status == 200){
      Swal.fire({
        width: '300',
        position: 'center',
        title: 'Successfuly logged in!',
        icon: 'success',
        showConfirmButton: false,
        timer: 1000,
      })
      navigate('/')
    }

    const data = await response.json()
    localStorage.setItem('tokens', JSON.stringify(data))
    setTokens(data)
  }

  const get_user = async _ => {
    const response = await fetch(`${API_URL}/user/get`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${tokens.access}`,
      },
    })
      
    if (response.status == 200){
      const user_data = await response.json()
      setUser(user_data)
    }

    if (response.status == 401){
      const res = await fetch(`${API_URL}/token/refresh/`, {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tokens)
      })
  
      if (res.status == 200){
        const data = await res.json()
        setTokens(prev => ({...prev, access: data.access}))
      }

      if (res.status == 401){
        navigate('/login')
        localStorage.removeItem('tokens')
        setTokens(null)
        Swal.fire({
          width: '300',
          position: 'center',
          title: 'Session expired, Log in again!',
          icon: 'error',
          showConfirmButton: false,
          timer: 1500,
        })
      }
    }
  }

  const logout = _ =>  {
    localStorage.removeItem('tokens')

    Swal.fire({
      width: '300',
      position: 'center',
      title: 'Successfuly logged out!',
      icon: 'success',
      showConfirmButton: false,
      timer: 1000,
    })

    setTokens(null)
    setUser(null)
    navigate('/')
  }

  return(
    <AuthContext.Provider value={{login, register, logout, user}}>
      {children}
    </AuthContext.Provider>
  )
}


export const useAuth = _ => {
  return useContext(AuthContext)
}
