import React from 'react'
import BurgerIcon from 'Images/svg/BurgerIcon'
import { BurgerIconWarp } from '../style'

const BurgerButton = () => {
  const toggleSideBar = () => {
    let sidebarWidth = document.getElementById('app-side-bar')?.style?.width
    if (sidebarWidth != '60px') {
      document.getElementById('app-side-bar').style.width = '60px'
      document.body.classList.remove('g-sidenav-show')
    } else {
      document.getElementById('app-side-bar').style.width = '250px'
      document.body.classList.add('g-sidenav-show')
    }
  }
  return (
    <BurgerIconWarp onClick={toggleSideBar} id="burger-icon-wrap">
      <BurgerIcon />
    </BurgerIconWarp>
  )
}

export default BurgerButton
