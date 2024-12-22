import css from '../css/components/settings.module.css'

import { useSettings } from '../contexts/SettingsContext'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function Settings(){
  const {isShown} = useSettings()
  const {logout, user} = useAuth()
  const navigate = useNavigate()

  return(
    <div className={`${css.wrapper} ${isShown && css.show}`}>
      <div className={css.box}>
        <p className={`${css.setting} ${isShown && css.showSettings}`} >Filter by categories</p>
        <p className={`${css.setting} ${isShown && css.showSettings}`} >My orders</p>
        {user ? <p className={`${css.setting} ${isShown && css.showSettings}`} onClick={logout} >Log out</p> : <p className={`${css.setting} ${isShown && css.showSettings}`} onClick={_=> navigate('/login')} >Log in</p>}
      </div>
    </div>
  )
}
