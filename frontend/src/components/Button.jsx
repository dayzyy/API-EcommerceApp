import css from '../css/components/button.module.css'

export default function Button({text, click, positive, big}){
  return(
    <button className={`${css.button} ${positive ? css.positive : css.negative} ${big ? css.big : ''}`} onClick={click} >{text}</button>
  )
}
