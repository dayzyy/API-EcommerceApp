import css from '../css/components/header.module.css'

import { HiMiniBars3BottomRight } from "react-icons/hi2";

import { HiOutlineShoppingCart } from "react-icons/hi";

import { FiUser } from "react-icons/fi";  //Authorized user for Desktop
import { FiUserCheck } from "react-icons/fi"; //Authorized user icon for Mobile
import { FiUserX } from "react-icons/fi"; //Unauthorized user icon for Mobile

import { useAuth } from '../contexts/AuthContext';

import { useState, useRef, useEffect } from 'react';

export default function Header(){
  const {user} = useAuth()

  const [isHidden, setIsHidden] = useState(false)
  const lastScrollY = useRef(0)

  const handle_scroll = _ => {
    console.log('scrolling')
    const scrollY = window.scrollY

    if (scrollY > lastScrollY.current) setIsHidden(true)
    else setIsHidden(false)

    lastScrollY.current = scrollY
  }

  useEffect(_ => {
    document.addEventListener('scroll', handle_scroll)
    return _ => document.removeEventListener('scroll', handle_scroll)
  }, [])


  return (
    <div className={`${css.header} ${isHidden ? css.hide : ''}`}>
      <h1 className={css.logoMobile} >E-comm</h1>
      <h1 className={css.logo} >E-commerce</h1>

      <div className={css.wrapper}>
        <HiOutlineShoppingCart className={css.icon} />

        {(user &&
          <>
            <div className={css.wrapperAuth}>
              <FiUser className={css.icon} />
              <p className={css.subtext} >{user.username}</p>
            </div>
            <FiUserCheck className={`${css.icon} ${css.iconUserMobile}`} />
          </>
        )}
        
        {(!user &&
          <>
            <div className={css.wrapperAuth}>
              <FiUser className={css.icon} />
              <p className={css.subtext} >sign in</p>
            </div>
            <FiUserX className={`${css.icon} ${css.iconUserMobile}`} />
          </>
        )}

        

        <HiMiniBars3BottomRight className={css.icon} />
      </div>
    </div>
  )
}
