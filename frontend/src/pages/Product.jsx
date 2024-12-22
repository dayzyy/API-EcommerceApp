import css from '../css/pages/productpage.module.css'

import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Product(){
  const {id} = useParams()
  const navigate = useNavigate()
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

  if (!product) return <h1>Loading...</h1>

  return(
    <div className={css.body}>
      <div className={css.wrapper}>
        <img className={css.image} src={product.image ? `${API_IMAGES_URL}/${product.image}` : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVLDP5s2j9u1x86fOb7kNKXanJeMn8zZ30ZQ&s'} loading='lazy' onClick={_ => window.location.href=`${API_IMAGES_URL}/${product.image}`}/>
        <div className={css.wrapperPrice}>
          <p className={css.text} >Price:</p>
          <p className={css.priceOld} >20$</p>
          <p className={css.priceCurrent} >16$</p>
        </div>
      </div>

      <div className={css.info}>  
        <p className={css.text} >Description</p>
        <p className={css.text} >Date published</p>
      </div>
    </div>
  )
}
