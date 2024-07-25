import React from 'react'
import DisplayView from '../pages/displayView/DisplayView'
import EditView from '../pages/editView/EditView'

export const routes = [
  {
    path: '/',
    element: <DisplayView />
  },
  {
    path: '/display',
    element: <DisplayView />
  },
  {
    path: '/display/:id',
    element: <DisplayView />
  },
  {
    path: '/edit/:id',
    element: <EditView />
  },
  {
    path: '/create',
    element: <EditView />
  },
  {
    path: '*',
    element: <DisplayView />
  }
]
