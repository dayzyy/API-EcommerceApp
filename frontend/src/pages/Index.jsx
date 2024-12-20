import css from '../css/pages/indexpage.module.css'

import Header from "../components/Header";
import HorizontalScroll from '../components/HorizontalScroll';

export default function Index(){
  return(
    <div className={css.body}>
      <Header/>
      <HorizontalScroll/>
    </div>
  )
}
