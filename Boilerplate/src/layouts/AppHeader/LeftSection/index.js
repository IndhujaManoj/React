import React, { Fragment } from 'react'
import { LeftSectionBox } from '../style'
import BurgerButton from './BurgerButton'
import AppLogo from './AppLogo'
import AppTitle from './AppTitle'

const LeftSection = () => {
  return (
    <LeftSectionBox>
      <BurgerButton />
      <AppLogo />
      <AppTitle />
    </LeftSectionBox>
  )
}

export default LeftSection
