import css from '../css/components/form.module.css'

export default function Form({fields, action}){
  return(
    <div className={css.form}>
      <div className={css.fields}>
        {
          fields.map((field, index) => {
            return(
              <div key={index} className={css.wrapper}>
                <input type="text" placeholder='' className={css.input} />
                <label className={css.label} >{field}</label>
              </div>
            )
          })
        }
      </div>

      <button className={css.button}>{action}</button>
    </div>
  )
}
