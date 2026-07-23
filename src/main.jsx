import React from 'react'
import ReactDOM from 'react-dom/client'
import { Analytics } from '@vercel/analytics/react'
import './index.css'

const isAdmin = window.location.pathname.startsWith('/admin')

async function init() {
  const root = ReactDOM.createRoot(document.getElementById('root'))
  if (isAdmin) {
    const { default: AdminApp } = await import('./admin/AdminApp.jsx')
    root.render(<React.StrictMode><AdminApp /></React.StrictMode>)
  } else {
    const { default: App } = await import('./App.jsx')
    root.render(
      <React.StrictMode>
        <App />
        <Analytics />
      </React.StrictMode>,
    )
  }
}
init()
