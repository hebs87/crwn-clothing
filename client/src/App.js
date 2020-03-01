import React, { useEffect } from 'react';
// Import Switch and Route to enable routing
import { Switch, Route, Redirect } from 'react-router-dom';
// Import connect to enable the app to access redux
import { connect } from 'react-redux';
// Import createStructured selector to allow multiple selector calls
import { createStructuredSelector } from 'reselect';

import './App.css';

// Import HomePage Component
import HomePage from './pages/homepage/homepage.component';
// Import ShopPage Component
import ShopPage from './pages/shop/shop.component'
// Import SignInAndSignUp Component
import SignInAndSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component'
// Import CheckoutPage component
import CheckoutPage from './pages/checkout/checkout.component';

// Import Header Component
import Header from './components/header/header.component'
// Import auth from firebase utiils
// Import selectors to pass into mapStateToProps
import { selectCurrentUser } from './redux/user/user.selectors';
// import checkUserSession for user persistence (passed into dispatch)
import { checkUserSession } from './redux/user/user.actions';

// Now that we are using Hooks, we can convert this component
// to a functional component
// Destructure the checkUserSession from mapDispatchToProps
// Destructure the currentUser from mapStateToProps
const App = ({ checkUserSession, currentUser }) => {
    // We use the useEffect() Hook to replace the
    // componentDidMount() method
    useEffect(() => {
        // Instantiate checkUserSession to listen to user state
        checkUserSession();
    // As we want this to behave as a componentDidMount() and
    // we only want this to render when our checkUserSession
    // value changes, we pass that prop into the array
    }, [checkUserSession]);

    return (
        <div>
            <Header />
            <Switch>
                <Route exact path='/' component={HomePage} />
                <Route path='/shop' component={ShopPage} />
                <Route exact path='/checkout' component={CheckoutPage} />
                <Route
                    exact
                    path='/signin'
                    render={() =>
                        currentUser ?
                            (<Redirect to='/' />)
                            :
                            (<SignInAndSignUp />)
                    }
                />
            </Switch>
        </div>
    );
};

// FOR REDIRECTING THE USER TO HOME PAGE IF SIGNED IN
// We want to get our redux user state
const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser
});

// This dispatches our checkUserSession action - passed
// into componenentDidMount to enable user persistance
const mapDispatchToProps = dispatch => ({
    checkUserSession: () => dispatch(checkUserSession())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
