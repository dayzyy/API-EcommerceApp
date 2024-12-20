import css from '../css/components/productcard.module.css'

export default function ProductCard({product}){
  const discount = _ => {
    return (product.price - (product.price * product.sale / 100)).toFixed(2)
  }

  return(
    <div className={css.wrapper}>
      <div className={css.wrapperImage}>
        <p className={css.discount}>-{product.sale}%</p>
        <img className={css.image} src={product.image ? product.image : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVLDP5s2j9u1x86fOb7kNKXanJeMn8zZ30ZQ&s'} />
        <p className={css.price} >{discount()}$</p>
      </div>
      <p className={css.category} >{product.category}</p>
    </div>   
  )
}
