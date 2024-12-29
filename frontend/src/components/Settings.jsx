import css from '../css/components/settings.module.css'

import Swal from 'sweetalert2'

import { useSettings } from '../contexts/SettingsContext'
import { useAuth } from '../contexts/AuthContext'
import { useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

export default function Settings(){
  const {isShown, toggleSettings} = useSettings()
  const [listIsShown, setListIsShown] = useState(false)
  const {logout, user} = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(_ => {
    setListIsShown(false)
  }, [location])

  const orders = _ => {
    if (!user) {
      toggleSettings()
      navigate('/login')
      Swal.fire({
        width: '300',
        position: 'center',
        title: 'Authorize to make orders!',
        icon: 'error',
        showConfirmButton: false,
        timer: 1500,
      })
      return
    }
    navigate('/orders')
  }

  const toggle_list = _ => {
    setListIsShown(prev => !prev)
  }

  const categories = [
    'Gaming',
    'Cloth',
    'Electronics',
    'Furniture',
    'Toys',
    'Books',
    'Beauty',
    'Sports',
    'Automotive',
    'Jewelry',
    'Home Appliances',
    'Music',
    'Pet Supplies',
    'Groceries',
    'Health',
    'Garden',
    'Office Supplies',
    'Footwear',
    'Baby Products',
    'Travel'
  ]

  return(
    <div className={`${css.wrapper} ${isShown && css.show}`}>
      <div className={css.box}>
        <div className={css.wrapperFilter}>
          <p className={`${css.setting} ${isShown && css.showSettings}`} onClick={toggle_list} >Filter by categories</p>
          <ul className={`${css.list} ${listIsShown ? css.showList : ''}`} >
            {
              categories.map(category => {
                return <li onClick={_ => navigate(`/products/${category}`)} className={css.listItem} key={category} >{category}</li>
              })
            }
          </ul>
        </div>
        <p className={`${css.setting} ${isShown && css.showSettings}`} onClick={orders} >My orders</p>
        {user ? <p className={`${css.setting} ${isShown && css.showSettings}`} onClick={logout} >Log out</p> : <p className={`${css.setting} ${isShown && css.showSettings}`} onClick={_=> navigate('/login')} >Log in</p>}
      </div>
    </div>
  )
}
