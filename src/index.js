import React from 'react'
import { ThemeProvider } from '@zendeskgarden/react-theming'
import App from './App'
import { createRoot } from 'react-dom/client'

const domNode = document.getElementById('root')
const root = createRoot(domNode)
root.render(
  <React.StrictMode>
        <ThemeProvider>
            <App />
        </ThemeProvider>
    </React.StrictMode>
)