import React from 'react'
import SideBar from './SideBar';

function Layout({children}) {
  return (
    <>
    <div className='main-content'>
    <SideBar/>
    <div className="content">
        {children}
    </div>
    </div>
    </>
  )
}

export default Layout