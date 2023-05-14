import React, { FC } from 'react'
import Header from '../Header'
import { Outlet } from 'react-router-dom'

const MainLayout: FC = () => {
  return (
    <div className="App">
      <div className="wrapper">
        <Header />
        <div className="content">
          <Outlet />
        </div>
      </div>
    </div >
  )
}

export default MainLayout