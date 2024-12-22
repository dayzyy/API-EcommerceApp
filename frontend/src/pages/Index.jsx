import css from '../css/pages/indexpage.module.css'

import HorizontalScroll from '../components/HorizontalScroll';
import { useEffect, useState } from 'react';


export default function Index(){
  const API_URL = 'http://localhost:8000'

  const [products, setProducts] = useState(null)

  useEffect(_ => {
    const get_products = async _ => {
      const response = await fetch(`${API_URL}/products/sale/`)

      if (response.status == 200){
        const data = await response.json()
        setProducts(data)
      }
    }
    get_products()
  }, [])

  return(
    <div className={css.body}>
      <div className={css.sale}>
        <h2 className={css.title} >Sale</h2>
        <HorizontalScroll products={products} />
      </div>
    </div>
  )
}
