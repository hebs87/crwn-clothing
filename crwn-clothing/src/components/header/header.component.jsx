import React from 'react';
// Import connect to enable access to reducer
import { connect } from 'react-redux';
// Import Link from react-router-dom for the nav links
import { Link } from 'react-router-dom';
// Import auth from firebase utils for user authentication
import { auth } from '../../firebase/firebase.utils'
// Import style sheet
import './header.styles.scss';
// Import SVG icon using specific React syntax
import { ReactComponent as Logo } from '../../assets/crown.svg';

const Header = ({ currentUser }) => (
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
            {
                // If we are signed in, we want to render a div with SIGN OUT,
                // which signs the user out when they click it
                currentUser ?
                (<div className='option' onClick={() => auth.signOut()}>SIGN OUT</div>)
                :
                // Else, we want to display the link to take us to the signin page
                (<Link className='option' to='/signin'>SIGN IN</Link>)
            }
        </div>
    </div>
)

// mapStateToProps is the function that we create to allow the
// component to directly access the reducer props
// The state parameter is the root reducer
const matStateToProps = state => ({
    // State is the root reducer object, user is the property
    // which refers to the userReducer, currentUser is the
    // property in the currentUser that has a default of null
    currentUser: state.user.currentUser
})

export default connect(matStateToProps)(Header);