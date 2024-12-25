import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Swal from "sweetalert2";

const CartContext = createContext()

export function CartProvider({children}){
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')))
  const navigate = useNavigate()

  const add_to_cart = id => {
    if (!cart){
      const products = [id]
      localStorage.setItem('cart', JSON.stringify(products))
      setCart(products)
  
      Swal.fire({
        width: '300',
        position: 'center',
        title: 'Item added to your cart!',
        icon: 'success',
        showConfirmButton: false,
        timer: 1000,
      })
    }
    else{
      if (cart.includes(id)){
        Swal.fire({
          width: '300',
          position: 'center',
          title: 'Item already in your cart!',
          icon: 'error',
          showConfirmButton: false,
          timer: 2000,
        })
        return
      }
      
      setCart(prev => [...prev, id])

      Swal.fire({
        width: '300',
        position: 'center',
        title: 'Item added to your cart!',
        icon: 'success',
        showConfirmButton: false,
        timer: 1000,
      })
    }
  }

  const empty_cart = _ => {
    localStorage.removeItem('cart')
    setCart(null)
  }

  const remove_from_cart = id => {
    if (cart.length == 1){
      empty_cart()
      return
    }
    setCart(prev => prev.filter(product_id => product_id != id))
  }

  return(
    <CartContext.Provider value={{cart, empty_cart, add_to_cart, remove_from_cart}}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = _ => {
  return useContext(CartContext)
}
