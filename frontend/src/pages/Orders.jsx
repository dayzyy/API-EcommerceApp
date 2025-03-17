import css from '../css/pages/orderspage.module.css'

import Loading from '../components/Loading'
import ProductCard from '../components/ProductCard'
import Button from '../components/Button'

import Swal from 'sweetalert2'

import { useAuth } from '../contexts/AuthContext'

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import API_URL from '../settings'

export default function Orders(){

  const [orders, setOrders] = useState(null)
  const {tokens} = useAuth()
  const navigate = useNavigate()

  useEffect(_ => {
    if (orders){
      if (orders.length == 0){
        navigate('/')
        Swal.fire({
          width: '300',
          position: 'center',
          title: 'No orders!',
          icon: 'error',
          showConfirmButton: false,
          timer: 1000,
        })
        return
      }
    }
  }, [orders])

  const get_orders = async _ => {
    if (!tokens) return

    const response = await fetch(`${API_URL}/products/ordered/`, {
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

    if(response.status == 400){
      navigate('/')
      Swal.fire({
        width: '300',
        position: 'center',
        title: 'No orders!',
        icon: 'error',
        showConfirmButton: false,
        timer: 1000,
      })
    }
  }

  useEffect(_ => {
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

    get_orders()
  }, [tokens])

  const cancel_order = async id => {
    const response = fetch(`${API_URL}/products/ordered/cancel/${id}/`, {
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

  if (orders.length == 0) return <h1>No orders</h1>

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
