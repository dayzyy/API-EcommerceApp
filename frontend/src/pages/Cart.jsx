import css from '../css/pages/cartpage.module.css'

import ProductCard from '../components/ProductCard'
import Loading from '../components/Loading'
import Button from '../components/Button'

import { useCart } from '../contexts/CartContext'
import { useAuth } from '../contexts/AuthContext'

import { useEffect, useState } from 'react'

import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

export default function Cart(){
  const {cart, remove_from_cart, empty_cart} = useCart()
  const [products, setProducts] = useState(null)
  const [total, setTotal] = useState(0)
  const {tokens} = useAuth()
  const navigate = useNavigate()

  const discount = product => {
    return Number((product.price - (product.price * product.sale / 100)).toFixed(2))
  }

  useEffect(_ => {
    const get_products = async _ => {
      if (!cart) return

      const response = await fetch(`http://localhost:8000/products/cart/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ids: [...cart]
        })
      })

      if (response.status == 200){
        const data = await response.json()

        let totalAmount = 0
        data.forEach(product => {
          totalAmount += discount(product)
        })
        setTotal(totalAmount)

        setProducts(data)
      }
    }
    get_products()
  }, [cart])

  const order = async _ => {
    if (!tokens) {
      navigate('/login')

      Swal.fire({
        width: '300',
        position: 'center',
        title: 'Authorize to make orders!',
        icon: 'error',
        showConfirmButton: false,
        timer: 1000,
      })
    }

    const response = await fetch(`http://localhost:8000/products/order/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${tokens.access}`,
      },
      body: JSON.stringify({
        ids: [...cart]
      })
    })

    if (response.status == 200){
      navigate('/')
      empty_cart()

      Swal.fire({
        width: '300',
        position: 'center',
        title: 'Successful order!',
        icon: 'success',
        showConfirmButton: false,
        timer: 1000,
      })
    }
  }

  if (!products) return <Loading/>

  return(
    <div className={css.body}>
      <div className={css.wrapperInfo}>
        <div className={css.container}>
          <h2 className={css.title} >Items in cart: {cart.length}</h2>
          <div className={css.wrapperPrice}>
            <h2 className={css.title} >Total:</h2>
            <h2 className={css.price} >{total}$</h2>
          </div>
        </div>
        <Button text='Checkout' positive={true} big={true} click={order} />
      </div>
      <div className={css.main}>
        {products.map(product => {
          return(
            <div className={css.wrapper} key={product.id}>
              <div className={css.wrapperImage}>
                <ProductCard  product={product} />
              </div>
              <Button text='remove' click={_ => remove_from_cart(product.id)} />
            </div>
          )
        })}
      </div>
    </div>
  )
}
