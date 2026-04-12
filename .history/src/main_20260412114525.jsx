import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ImageProvider from './context/imageContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ImageProvider>
    <App />
  </StrictMode>,
)
