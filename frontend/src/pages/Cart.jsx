import css from '../css/pages/cartpage.module.css'

import ProductCard from '../components/ProductCard'
import Loading from '../components/Loading'
import Button from '../components/Button'

import { useCart } from '../contexts/CartContext'
import { useAuth } from '../contexts/AuthContext'

import { useEffect, useState } from 'react'

import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

import API_URL from '../settings'

export default function Cart(){
  const {cart, remove_from_cart, empty_cart} = useCart()
  const [total, setTotal] = useState(0)
  const {tokens} = useAuth()
  const navigate = useNavigate()

  const discount = product => {
    return Number((product.price - (product.price * product.sale / 100)).toFixed(2))
  }

  useEffect(_ => {
    if (!cart){
      navigate('/')
      empty_cart()
      return
    }
  }, [cart])

  useEffect(_ => {
    if (cart){
      let totalAmount = 0
      cart.forEach(product => {
        totalAmount += discount(product)
      })
      setTotal(totalAmount)
    }
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
      return
    }

    const ids = []

    for (const product of cart) ids.push(product.id)

    const response = await fetch(`${API_URL}/products/order/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${tokens.access}`,
      },
      body: JSON.stringify({
        ids: ids
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

    if (response.status == 405){
      Swal.fire({
        width: '300',
        position: 'center',
        title: 'Something went wrong',
        icon: 'error',
        showConfirmButton: false,
        timer: 1000,
      })
    }
  }

  if (!cart) return <Loading/>

  return(
    <div className={css.body}>
      <div className={css.wrapperInfo}>
        <div className={css.container}>
          <h2 className={css.title} >Items in cart: {cart && cart.length}</h2>
          <div className={css.wrapperPrice}>
            <h2 className={css.title} >Total:</h2>
            <h2 className={css.price} >{total}$</h2>
          </div>
        </div>
        <Button text='Checkout' positive={true} big={true} click={order} />
      </div>
      <div className={css.main}>
        {cart.map(product => {
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
