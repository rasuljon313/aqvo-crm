import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './assets/main.scss'
import App from './components/router/App.jsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </StrictMode>,
)
