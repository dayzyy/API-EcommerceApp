import css from '../css/components/form.module.css'

import { Link } from 'react-router-dom'

export default function Form({fields, action, submit, link}){
  return(
    <div className={css.form}>
      <div className={css.fields}>
        {fields}
      </div>

      <button onClick={submit} className={css.button}>{action}</button>

      <Link to={link.path} >{link.text}</Link>
    </div>
  )
}
