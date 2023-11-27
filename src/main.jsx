import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css' 
import App from './App.jsx'
import { inicializarFirebase } from './firebase/config.js'

inicializarFirebase()
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
