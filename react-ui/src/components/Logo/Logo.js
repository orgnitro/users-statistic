import React from 'react'
import { Link } from 'react-router-dom'
import './Logo.scss'

const Logo = () => {
  return (
    <div className="logo wrapper">
      <Link to='/' className="logo-link">
        AppCo
    </Link>
    </div>
  )
}

export default Logo
