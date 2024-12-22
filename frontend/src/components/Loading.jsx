import css from '../css/components/loadingscreen.module.css'

import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function Loading(){
  return(
    <div className={css.wrapper}>
      <AiOutlineLoading3Quarters className={css.load} />
    </div>
  )
}
