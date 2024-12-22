import css from '../css/components/horizontalscroll.module.css'

import ProductCard from './ProductCard'
import Loading from './Loading'

export default function HorizontalScroll({products}){
  if (!products) return(
    <div className={css.wrapper}>
      <Loading/>
    </div>
  )

  return (
    <div className={css.wrapper}>
      {
        products.map(product => {
          return <ProductCard key={product.id} product={product} />
        })
      }
    </div>
  )
}
