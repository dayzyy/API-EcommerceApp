import css from '../css/pages/authpages.module.css'

import Header from "../components/Header"
import Form from "../components/AuthForm"

export default function Login(){
  
  const fields = [
    'email',
    'password',
  ]

  return(
    <div className={css.body}>
      <Header/>
      <Form fields={fields} action='Log in' />
    </div>
  )
}
