import React from 'react';
// Import connect to enable access to reducer
import { connect } from 'react-redux';
// Import createStructured selector to allow multiple selector calls
import { createStructuredSelector } from 'reselect';
// Import auth from firebase utils for user authentication
import { auth } from '../../firebase/firebase.utils'
// Import the CartItem component
import CartIcon from '../cart-icon/cart-icon.component';
// Import the CartDropdown component
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
// Import selectors to pass into mapStateToProps
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { selectCartHidden } from '../../redux/cart/cart.selectors';
// Import SVG icon using specific React syntax
import { ReactComponent as Logo } from '../../assets/crown.svg';
// Import styled components
import { HeaderContainer, LogoContainer, OptionsContainer, OptionLink, OptionDiv } from './header.styles';

const Header = ({ currentUser, hidden }) => (
    <HeaderContainer>
        <LogoContainer to='/'>
            <Logo className='logo' />
        </LogoContainer>
        <OptionsContainer>
            <OptionLink to='/'>
                HOME
            </OptionLink>
            <OptionLink to='/shop'>
                SHOP
            </OptionLink>
            <OptionLink to='/'>
                CONTACT
            </OptionLink>
            {
                // If we are signed in, we want to render a div with SIGN OUT,
                // which signs the user out when they click it
                currentUser ?
                (<OptionDiv onClick={() => auth.signOut()}>SIGN OUT</OptionDiv>)
                :
                // Else, we want to display the link to take us to the signin page
                (<OptionLink to='/signin'>SIGN IN</OptionLink>)
            }
            <CartIcon />
        </OptionsContainer>
        {
            hidden ? null : <CartDropdown />
        }
    </HeaderContainer>
);

// mapStateToProps is the function that we create to allow the
// component to directly access the root reducer props
// We use createStructuredSelector to automatically pass in
// the top level state to our selector calls
const mapStateToProps = createStructuredSelector({
    // We want to return both values as props here
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
});

export default connect(mapStateToProps)(Header);