import { createContext, useContext, useState, useEffect} from "react";

import Swal from "sweetalert2";

const AuthContext = createContext()

const API_URL = 'http://localhost:8000'

export const AuthProvider = ({children}) =>  {
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
      })
      return
    }

    if (response.status == 200){
      Swal.fire({
        width: '300',
        position: 'top-end',
        title: 'Successfuly registered!',
        icon: 'success',
        showConfirmButton: false,
        timer: 1000,
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
        position: 'top-end',
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
        position: 'top-end',
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
        position: 'top-end',
        title: 'Successfuly loged in!',
        icon: 'success',
        showConfirmButton: false,
        timer: 1000,
      })
    }

    const data = await response.json()
    localStorage.setItem('tokens', JSON.stringify(data))
  }

  const get_user = async _ => {
    const tokens = JSON.parse(localStorage.getItem('tokens'))

    if (!tokens) return null

    const response = await fetch(`${API_URL}/user/get`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${tokens.access}`,
      },
    })
      
    if (response.status == 200){
      const user = await response.json()
      return user
    }
  }

  return(
    <AuthContext.Provider value={{login, register, get_user}}>
      {children}
    </AuthContext.Provider>
  )
}


export const useAuth = _ => {
  return useContext(AuthContext)
}
