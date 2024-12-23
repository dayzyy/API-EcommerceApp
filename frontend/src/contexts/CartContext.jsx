import { createContext, useContext, useEffect, useState } from "react";

import Swal from "sweetalert2";

const CartContext = createContext()

export function CartProvider({children}){
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')))

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
      
      setCart(prev => {
        const newCart = [...prev, id]
        localStorage.setItem('cart', JSON.stringify(newCart))
        return newCart
      })

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

  return(
    <CartContext.Provider value={{cart, add_to_cart}}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = _ => {
  return useContext(CartContext)
}
