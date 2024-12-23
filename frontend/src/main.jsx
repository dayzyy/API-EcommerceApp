import { createRoot } from 'react-dom/client'
import './index.css'

import Settings from './components/Settings.jsx'
import Header from './components/Header.jsx'

import App from './App.jsx'
import { AuthProvider } from './contexts/AuthContext.jsx'
import { SettingsProvider } from './contexts/SettingsContext.jsx'
import { CartProvider } from './contexts/CartContext.jsx'

import { BrowserRouter as Router } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <Router>
    <AuthProvider>
      <CartProvider>
        <SettingsProvider>
          <Settings/>
          <Header/>
        </SettingsProvider>
        <App />
      </CartProvider>
    </AuthProvider>
  </Router>
)
