import { createContext, useContext, useState, useEffect} from "react";

import Swal from "sweetalert2";

import '../css/swal.css'

const AuthContext = createContext()

const API_URL = 'http://localhost:8000'

export const AuthProvider = ({children}) =>  {
  const [user, setUser] = useState(null)
  const [tokens, setTokens] = useState(null)

  useEffect(_ => {
    const savedTokens = JSON.parse(localStorage.getItem('tokens'))

    if (savedTokens) setTokens(savedTokens)
  }, [])

  useEffect(_ => {
    if (tokens) get_user()
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
        position: 'top-end',
        title: data.error,
        icon: 'error',
        showConfirmButton: false,
        timer: 2000,
        customClass: 'index',
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
        customClass: 'index',
      })
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
        customClass: 'index',
      })
      return
    }

    if (response.status == 200){
      Swal.fire({
        width: '300',
        position: 'center',
        title: 'Successfuly loged in!',
        icon: 'success',
        showConfirmButton: false,
        timer: 1000,
        customClass: 'index',
      })
    }

    const data = await response.json()
    localStorage.setItem('tokens', JSON.stringify(data))
    setTokens(data)
  }

  const get_user = async _ => {
    if (!tokens) return null

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
        setTokens(data)
      }
      
    }
  }

  return(
    <AuthContext.Provider value={{login, register, user}}>
      {children}
    </AuthContext.Provider>
  )
}


export const useAuth = _ => {
  return useContext(AuthContext)
}
