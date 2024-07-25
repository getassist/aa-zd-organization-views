import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { appRoutes } from '../providers/Routes'
import AppMain from './AppMain'
import AuthMain from './AuthMain'

const AppRouter = () => {
  return (
    <Routes>
      <Route path='/' element={<AppMain />} />
      <Route path='/auth' element={<AuthMain />} />
      <Route path='*' element={<AppMain />} />
    </Routes>
  )
}

export default AppRouter