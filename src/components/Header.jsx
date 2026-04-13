import React from 'react'
import { Link } from 'react-router-dom';
import './Header.css'
import Logo from '../assets/logo/header-logo.svg'

const Header = () => {
  return (
    <>
      <header>
        <Link to="/">
            <img className='logo' src={Logo} alt="Mercedes-Benz Logo" />
        </Link>

        <ul className='nav'>
            <li><Link to="/">TEAM</Link></li>
            <li><Link to="/">CAR</Link></li>
            <li><Link to="/">RACE</Link></li>
            <li><Link to="/">PARTNERS</Link></li>
        </ul>
      </header>
    </>
  )
}

export default Header