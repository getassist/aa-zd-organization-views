import React, { useContext } from 'react'
import AppBody from './AppBody'
import { Chrome } from '@zendeskgarden/react-chrome'
import AppSideNav from './AppSideNav'
import { ViewsContext } from '../contexts/ViewsContext'
import Loading from './Loading'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'

const AppMain = () => {
  const {currentUser} = useContext(AuthContext)
  const {loading} = useContext(ViewsContext)

  if (!currentUser) return <Navigate to='/auth' />

  if (loading) return <Loading />

  return (
    <Chrome isFluid>
      <AppSideNav />
      <AppBody />
    </Chrome>
  )
}

export default AppMain