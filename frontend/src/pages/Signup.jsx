import Form from "../components/AuthForm"
import Input from '../components/Input'

import { useAuth } from '../contexts/AuthContext'

import { useState } from 'react'

export default function Signup(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')

  const {register} = useAuth()
  
  const fields = (<>
    <Input field='email' value={email} change={e => setEmail(e.target.value)} />
    <Input field='password' value={password} change={e => setPassword(e.target.value)} />
    <Input field='password' value={password2} change={e => setPassword2(e.target.value)} />
  </>)

  return <Form fields={fields} action='Sign up' submit={_ => register(email, password, password2)} link={{path: '/login', text: 'Log in'}} />
}
