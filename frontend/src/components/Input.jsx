import css from '../css/components/input.module.css'

export default function Input({field, value, change}){
  return(
    <div className={css.wrapper}>
      <input type="text" placeholder='' value={value} onChange={e => change(e)} className={css.input} />
      <label className={css.label} >{field}</label>
    </div>
  )
}
