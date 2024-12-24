import css from '../css/pages/productpage.module.css'

import Loading from '../components/Loading'
import { useCart } from '../contexts/CartContext';

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Swal from 'sweetalert2';

export default function Product(){
  const {id} = useParams()
  const {add_to_cart} = useCart()
  const [product, setProduct] = useState(null)

  const API_IMAGES_URL = 'http://localhost:8000'

  useEffect(_ => {
    const get_product = async _ => {
      const response = await fetch(`http://localhost:8000/products/${id}/`)
      
      if (response.status == 200){
        const data = await response.json()
        setProduct(data)
      }
    }
    get_product()
  }, [])

  const discount = _ => {
    return (product.price - (product.price * product.sale / 100)).toFixed(2)
  }



  if (!product) return <Loading/>

  return(
    <div className={css.body}>
      <div className={css.wrapper}>
        <img className={css.image} src={product.image ? `${API_IMAGES_URL}/${product.image}` : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVLDP5s2j9u1x86fOb7kNKXanJeMn8zZ30ZQ&s'} loading='lazy' onClick={_ => window.location.href=`${API_IMAGES_URL}/${product.image}`}/>
        <div className={css.wrapperPrice}>
          <p className={css.text} >Price:</p>
          {product.sale && <p className={css.priceOld} >{product.price}$</p>}
          <p className={css.priceCurrent} >{discount()}$</p>
        </div>
      </div>

      <div className={css.info}>  
        <div className={css.wrapperDesc}>
          <div className={css.wrapperInfo}>
            <p className={css.text} >Category:</p>
            <p className={css.subtext} >{product.category}</p>
          </div>
          <div className={css.wrapperInfo}>
            <p className={css.text} >Description:</p>
            <p className={css.subtext} >{product.description}</p>
          </div>
          <div className={css.wrapperInfo}>
            <p className={css.text} >Date published: </p>
            <p className={css.subtext} >{product.created_at}</p>
          </div>
        </div>

        <button className={css.button} onClick={_ => add_to_cart(product.id)} >Add to cart</button>
      </div>
    </div>
  )
}
