import css from '../css/pages/indexpage.module.css'

import HorizontalScroll from '../components/HorizontalScroll';
import CardContainer from '../components/CardContainer';

import { useEffect, useState } from 'react';


export default function Index(){
  const API_URL = 'http://localhost:8000'

  const [productsInSale, setProductsInSale] = useState(null)
  const [products, setProducts] = useState(null)

  useEffect(_ => {
    const get_products_in_sale = async _ => {
      const response = await fetch(`${API_URL}/products/sale/`)

      if (response.status == 200){
        const data = await response.json()
        setProductsInSale(data)
      }
    }
    
    const get_products = async _ => {
      const response = await fetch(`${API_URL}/products/all/`)

      if (response.status == 200){
        const data = await response.json()
        setProducts(data)
      }
    }

    get_products_in_sale()
    get_products()
  }, [])

  return(
    <div className={css.body}>
      <div className={css.sale}>
        <h2 className={css.title} >Sale</h2>
        <HorizontalScroll products={productsInSale} />
      </div>
      <div className={css.main}>
        <CardContainer products={products} />
      </div>
    </div>
  )
}
