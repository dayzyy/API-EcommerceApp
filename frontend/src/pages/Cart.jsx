import css from '../css/pages/cartpage.module.css'

import ProductCard from '../components/ProductCard'
import Loading from '../components/Loading'
import Button from '../components/Button'

import { useCart } from '../contexts/CartContext'

import { useEffect, useState } from 'react'

export default function Cart(){
  const API_IMAGES_URL = 'http://localhost:8000'

  const {cart} = useCart()
  const [products, setProducts] = useState([])

  useEffect(_ => {
    const get_product = async id => {
      const response = await fetch(`http://localhost:8000/products/${id}/`)

      if (response.status == 200){
        const product = await response.json()
        setProducts(prev => [...prev, product])
      }
    }

    cart.forEach(id => {
      get_product(id)
    })
  }, [cart])

  if (!products) return <Loading/>

  return(
    <div className={css.body}>
      {products.map(product => {
        return(
          <div className={css.wrapper} key={product.id}>
            <div className={css.wrapperImage}>
              <ProductCard  product={product} />
            </div>
            <Button text='remove' />
          </div>
        )
      })}
    </div>
  )
}
