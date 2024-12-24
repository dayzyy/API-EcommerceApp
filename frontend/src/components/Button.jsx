import css from '../css/components/button.module.css'

export default function Button({text, click}){
  return(
    <button className={css.button} onClick={click} >{text}</button>
  )
}
