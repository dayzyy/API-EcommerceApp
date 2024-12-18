import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import Login from "./pages/Login"
import Signup from "./pages/Signup"
import PageNotFound from "./pages/PageNotFound"

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path='login' element={<Login/>} />
        <Route path='signup' element={<Signup/>} />
        <Route path='*' element={<PageNotFound/>} />
      </Routes>
    </Router>
  )
}
