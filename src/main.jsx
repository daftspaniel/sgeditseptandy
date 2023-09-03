import React from 'react'
import ReactDOM from 'react-dom/client'
import { hookstate } from '@hookstate/core'

import App from './App.jsx'
import './index.css'

const globalState = hookstate({ primaryCharacter: '', secondaryCharacter: '' })

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
