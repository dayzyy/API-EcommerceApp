import css from '../css/pages/authpages.module.css'

import Header from "../components/Header"
import Form from "../components/AuthForm"
import Input from '../components/Input'

import { useAuth } from '../contexts/AuthContext'

import { useState } from 'react'

export default function Login(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const {login} = useAuth()
  
  const fields = (<>
    <Input field='email' value={email} change={e => setEmail(e.target.value)} />
    <Input field='password' value={password} change={e => setPassword(e.target.value)} />
  </>)

  return(
    <div className={css.body}>
      <Header/>
      <Form fields={fields} action='Log in' submit={_ => login(email, password)} link={{path: '/signup', text: 'Sign up'}} />
    </div>
  )
}
