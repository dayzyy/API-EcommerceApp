import { Routes, Route } from "react-router-dom"

import Index from "./pages/Index"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import PageNotFound from "./pages/PageNotFound"
import Product from "./pages/Product"
import Cart from "./pages/Cart"
import Orders from "./pages/Orders"

export default function App() {
  return (
      <Routes>
        <Route index element={<Index/>} />
        <Route path='login' element={<Login/>} />
        <Route path='signup' element={<Signup/>} />
        <Route path='product/:id' element={<Product/>} />
        <Route path='cart' element={<Cart/>} />
        <Route path='orders' element={<Orders/>} />
        <Route path='*' element={<PageNotFound/>} />
      </Routes>
  )
}
