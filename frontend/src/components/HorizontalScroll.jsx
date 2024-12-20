import css from '../css/components/horizontalscroll.module.css'

import ProductCard from './ProductCard'

export default function HorizontalScroll(){
  const product = {
    category: 'Gaming',
    price: 100,
    sale: 25,
    image: 'https://www.marthastewart.com/thmb/B4ku9jFcUXNXuwjCCFqIjMksZSo=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/sofa-vs-couch-couch-lead-getty-1023-4f7c7e1ee44d4a0aa2cfd2b0faee970a.jpg',
  }
  return (
    <div className={css.wrapper}>
      <ProductCard product={product} />
    </div>
  )
}
