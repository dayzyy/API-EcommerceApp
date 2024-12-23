import css from '../css/components/button.module.css'

export default function Button({text}){
  return(
    <button className={css.button} >{text}</button>
  )
}
