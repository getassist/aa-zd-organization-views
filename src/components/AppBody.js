import React from 'react'
import { Body, Content, Main } from '@zendeskgarden/react-chrome'
import { Route, Routes } from 'react-router-dom'
import { routes } from '../providers/Routes'

const AppBody = () => {
  return (
    <Body hasFooter={false}>
      <Content style={{ height: '100vh' }}>
        <Main style={{ padding: 20 }}>
          <Routes>
            {routes.map((route) => (
              <Route key={route.path} path={route.path} element={route.element} />
            ))}
          </Routes>
        </Main>
      </Content>
    </Body>
  )
}

export default AppBody