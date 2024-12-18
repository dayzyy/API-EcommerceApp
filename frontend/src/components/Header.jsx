import css from '../css/components/header.module.css'

import { HiMiniBars3BottomRight } from "react-icons/hi2";

import { HiOutlineShoppingCart } from "react-icons/hi";

import { FiUser } from "react-icons/fi";  //Authorized user for Desktop
import { FiUserCheck } from "react-icons/fi"; //Authorized user icon for Mobile
import { FiUserX } from "react-icons/fi"; //Unauthorized user icon for Mobile

export default function Header(){
  return (
    <div className={css.header}>
      <h1 className={css.logoMobile} >E-comm</h1>
      <h1 className={css.logo} >E-commerce</h1>

      <div className={css.wrapper}>
        <HiOutlineShoppingCart className={css.icon} />

        <div className={css.wrapperAuth}>
          <FiUser className={css.icon} />
          <p className={css.subtext} >@dayzyy</p>
        </div>
        <FiUserCheck className={`${css.icon} ${css.iconUserMobile}`} />

        <HiMiniBars3BottomRight className={css.icon} />
      </div>
    </div>
  )
}
