import css from '../css/components/header.module.css'

import { HiMiniBars3BottomRight } from "react-icons/hi2";

import { HiOutlineShoppingCart } from "react-icons/hi";

import { FiUser } from "react-icons/fi";  //Authorized user for Desktop
import { FiUserCheck } from "react-icons/fi"; //Authorized user icon for Mobile
import { FiUserX } from "react-icons/fi"; //Unauthorized user icon for Mobile

import { useAuth } from '../contexts/AuthContext';
import { useSettings } from '../contexts/SettingsContext';

import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Header(){
  const navigate = useNavigate()
  const {user} = useAuth()
  const {toggleSettings} = useSettings()


  const [isHidden, setIsHidden] = useState(false)
  const lastScrollY = useRef(0)

  const handle_scroll = _ => {
    const scrollY = window.scrollY

    if (scrollY > lastScrollY.current) setIsHidden(true)
    else setIsHidden(false)

    lastScrollY.current = scrollY
  }

  const handleClick = _ => {
    toggleSettings()
  }

  useEffect(_ => {
    document.addEventListener('scroll', handle_scroll)
    return _ => document.removeEventListener('scroll', handle_scroll)
  }, [])


  return (
    <div className={`${css.header} ${isHidden ? css.hide : ''}`}>
      <h1 className={css.logoMobile} onClick={_ => navigate('/')} >E-comm</h1>
      <h1 className={css.logo} onClick={_ => navigate('/')} >E-commerce</h1>

      <div className={css.wrapper}>
        <HiOutlineShoppingCart className={css.icon} />

        {(user &&
          <>
            <div className={css.wrapperAuth}>
              <FiUser className={css.icon} />
              <p className={css.subtext} >{user.username}</p>
            </div>
            <FiUserCheck className={`${css.icon} ${css.iconUserMobile}`}/>
          </>
        )}
        
        {(!user &&
          <>
            <div className={css.wrapperAuth}>
              <FiUser className={css.icon} onClick={_ => navigate('signup/')}/>
              <p className={css.subtext} >sign in</p>
            </div>
            <FiUserX className={`${css.icon} ${css.iconUserMobile}`} onClick={_ => navigate('signup/')} />
          </>
        )}

        

        <HiMiniBars3BottomRight className={css.icon} onClick={handleClick} />
      </div>
    </div>
  )
}
