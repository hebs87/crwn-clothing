import React from 'react';
// Import Link from react-router-dom for the nav links
import { Link } from 'react-router-dom';
// Import connect to enable access to reducer
import { connect } from 'react-redux';
// Import auth from firebase utils for user authentication
import { auth } from '../../firebase/firebase.utils'
// Import the CartItem component
import CartIcon from '../cart-icon/cart-icon.component';
// Import the CartDropdown component
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
// Import SVG icon using specific React syntax
import { ReactComponent as Logo } from '../../assets/crown.svg';
// Import style sheet
import './header.styles.scss';

const Header = ({ currentUser, hidden }) => (
    <div className='header'>
        <Link className='logo-container' to='/'>
            <Logo className='logo' />
        </Link>
        <div className='options'>
            <Link className='option' to='/'>
                HOME
            </Link>
            <Link className='option' to='/shop'>
                SHOP
            </Link>
            <Link className='option' to='/'>
                CONTACT
            </Link>
            {
                // If we are signed in, we want to render a div with SIGN OUT,
                // which signs the user out when they click it
                currentUser ?
                (<div className='option' onClick={() => auth.signOut()}>SIGN OUT</div>)
                :
                // Else, we want to display the link to take us to the signin page
                (<Link className='option' to='/signin'>SIGN IN</Link>)
            }
            <CartIcon />
        </div>
        {
            hidden ? null : <CartDropdown />
        }
    </div>
);

// mapStateToProps is the function that we create to allow the
// component to directly access the root reducer props
// Here, we want to destructure our nested values from the
// root reducer...
// We get the currentUser value which is nested in the
// user property of the root reducer, likewise with the hidden
const mapStateToProps = ({ user: {currentUser}, cart: { hidden } }) => ({
    // We want to return both values as props here
    currentUser,
    hidden
});

export default connect(mapStateToProps)(Header);