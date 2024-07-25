import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { ViewsContextProvider } from '../contexts/ViewsContext'
import { AuthContextProvider } from '../contexts/AuthContext'
import AppRouter from '../components/AppRouter'
import { ToastProvider } from '@zendeskgarden/react-notifications'
import { DEFAULT_THEME } from '@zendeskgarden/react-theming'

const topProps = {
  style: { top: DEFAULT_THEME.space.base * 3 }
}
const bottomProps = {
  style: { bottom: DEFAULT_THEME.space.base * 3 }
}
const placementProps = {
  'top-start': topProps,
  top: topProps,
  'top-end': topProps,
  'bottom-start': bottomProps,
  bottom: bottomProps,
  'bottom-end': bottomProps
}

const NavBar = () => {
  return (
    <div className='navbar-app'>
      <ToastProvider zIndex={10} placementProps={placementProps}>
        <BrowserRouter>
          <AuthContextProvider>
              <ViewsContextProvider>

                <AppRouter />

              </ViewsContextProvider>
          </AuthContextProvider>
        </BrowserRouter>
      </ToastProvider>
    </div>
  )
}

export default NavBar
