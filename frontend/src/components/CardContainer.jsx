import css from '../css/components/cardcontainer.module.css'

import ProductCard from './ProductCard'
import Loading from './Loading'

export default function CardContainer({products}){


  if (!products) return <Loading/>

  return(
    <div className={css.box}>
      {
        products.map(product => {
          return(
            <div key={product.id} className={css.wrapper}>
              <ProductCard product={product} />
            </div>
          )
        })
      }
    </div>
  )
}
