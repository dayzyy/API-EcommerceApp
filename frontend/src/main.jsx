import { createRoot } from 'react-dom/client'
import './index.css'

import Settings from './components/Settings.jsx'
import Header from './components/Header.jsx'

import App from './App.jsx'
import { AuthProvider } from './contexts/AuthContext.jsx'
import { SettingsProvider } from './contexts/SettingsContext.jsx'
import { BrowserRouter as Router } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <Router>
    <AuthProvider>
      <SettingsProvider>
        <Settings/>
        <Header/>
      </SettingsProvider>
      <App />
    </AuthProvider>
  </Router>
)
