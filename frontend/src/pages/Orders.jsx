import css from '../css/pages/orderspage.module.css'

import Loading from '../components/Loading'
import ProductCard from '../components/ProductCard'
import Button from '../components/Button'

import Swal from 'sweetalert2'

import { useAuth } from '../contexts/AuthContext'

import { useEffect, useState } from 'react'

export default function Orders(){
  const API_URL = 'http://localhost:8000/products'

  const [orders, setOrders] = useState(null)
  const {tokens} = useAuth()


  const get_orders = async _ => {
    if (!tokens) return

    const response = await fetch(`${API_URL}/ordered/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${tokens.access}`,
      }
    })

    if (response.status == 200){
      const data = await response.json()
      setOrders(data)
    }
  }

  useEffect(_ => {
    get_orders()
  }, [tokens])

  const cancel_order = async id => {
    const response = fetch(`${API_URL}/ordered/cancel/${id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${tokens.access}`,
      }
    })

    if (response.status = 200){
      Swal.fire({
        width: '300',
        position: 'center',
        title: 'Order canceled!',
        icon: 'success',
        showConfirmButton: false,
        timer: 1000,
      })
      get_orders()
    }
  }

  if (!orders) return <Loading/>

  return(
    <div className={css.body}>
      <div className={css.main}>
        {orders.map(product => {
          return(
            <div className={css.wrapper} key={product.id}>
              <div className={css.wrapperImage}>
                <ProductCard  product={product} />
              </div>
              <Button text='cancel' click={_ => cancel_order(product.id)} />
            </div>
          )
        })}
      </div>
    </div>
  )
}