import css from '../css/components/horizontalscroll.module.css'

import ProductCard from './ProductCard'

export default function HorizontalScroll({products}){
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
