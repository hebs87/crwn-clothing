import React from 'react';
// Import Link from react-router-dom for the nav links
import { Link } from 'react-router-dom';
// Import style sheet
import './header.styles.scss';
// Import SVG icon using specific React syntax
import { ReactComponent as Logo } from '../../assets/crown.svg';

const Header = () => (
    <div className='header'>
        <Link className='logo-container' to='/'>
            <Logo className='logo' />
        </Link>
        <div className='options'>
            <Link className='option' to='/shop'>
                SHOP
            </Link>
            <Link className='option' to='/'>
                CONTACT
            </Link>
        </div>
    </div>
)

export default Header;