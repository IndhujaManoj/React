import React from 'react'
import SaamaLogo from 'Images/svg/SaamaLogo'
import { SaamaLogoWrap } from '../style'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const AppLogo = () => {
  const { whiteLabelData } = useSelector(
    (state) => state.account
  )

    

  return (
    <SaamaLogoWrap>

      { !whiteLabelData.isLoading && <Link to="/">
        {whiteLabelData.isActive ? <img src={whiteLabelData.account_logo} height="40" /> : <SaamaLogo />}
        
        </Link>}
    </SaamaLogoWrap>
  )
}

export default AppLogo
