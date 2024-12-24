import { useNavigate } from 'react-router-dom'
import css from '../css/components/productcard.module.css'

export default function ProductCard({product}){
  const navigate = useNavigate()

  const discount = _ => {
    return (product.price - (product.price * product.sale / 100)).toFixed(2)
  }

  const API_IMAGES_URL = 'http://localhost:8000'

  return(
    <div className={css.wrapper}>
      {product.sale && <p className={css.discount}>-{product.sale}%</p>}
      <img className={css.image} src={product.image ? `${API_IMAGES_URL}/${product.image}` : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVLDP5s2j9u1x86fOb7kNKXanJeMn8zZ30ZQ&s'} loading='lazy' onClick={_ => navigate(`/product/${product.id}`)}/>
      <div className={css.wrapperInfo}>
        <p className={css.category} >{product.category}</p>
        <p className={css.price} >{discount()}$</p>
      </div>
    </div>   
  )
}
