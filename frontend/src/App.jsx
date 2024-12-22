import { Routes, Route } from "react-router-dom"

import Index from "./pages/Index"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import PageNotFound from "./pages/PageNotFound"
import Product from "./pages/Product"

export default function App() {
  return (
      <Routes>
        <Route index element={<Index/>} />
        <Route path='login' element={<Login/>} />
        <Route path='signup' element={<Signup/>} />
        <Route path='product/:id' element={<Product/>} />
        <Route path='*' element={<PageNotFound/>} />
      </Routes>
  )
}
