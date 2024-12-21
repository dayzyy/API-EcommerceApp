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

  return <Form fields={fields} action='Log in' submit={_ => login(email, password)} link={{path: '/signup', text: 'Sign up'}} />
  
}
