import css from '../css/components/settings.module.css'

import { useSettings } from '../contexts/SettingsContext'

export default function Settings(){
  const {isShown} = useSettings()

  return(
    <div className={`${css.wrapper} ${isShown && css.show}`}>
      <div className={css.box}>
        <p className={css.setting} >Filter by categories</p>
        <p className={css.setting} >My orders</p>
        <p className={css.setting} >Log out</p>
      </div>
    </div>
  )
}
