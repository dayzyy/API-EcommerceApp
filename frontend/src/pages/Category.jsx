import css from '../css/pages/categorypage.module.css'

import CardContainer from '../components/CardContainer'
import Loading from '../components/Loading'

import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

export default function Category(){
  const navigate = useNavigate()
  const {category} = useParams()
  const [products, setProducts] = useState(null)

  useEffect(_ => {
    const get_products = async _ => {
      const response = await fetch(`http://localhost:8000/products/${category}/`)

      if (response.status == 400) navigate('/')

      if (response.status == 200){
        const data = await response.json()
        setProducts(data)
      }
    }
    get_products()
  }, [category])

  if (!products) return <Loading/>

  if (products.length == 0) return <h2>No items for ({category})</h2>

  return (
    <div className={css.body}>
      <CardContainer products={products} />
    </div>
  )
}
