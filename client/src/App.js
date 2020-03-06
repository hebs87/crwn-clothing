import React, {useEffect, lazy, Suspense} from 'react';
// Import Switch and Route to enable routing
import {Switch, Route, Redirect} from 'react-router-dom';
// Import connect to enable the app to access redux
import {connect} from 'react-redux';
// Import createStructured selector to allow multiple selector calls
import {createStructuredSelector} from 'reselect';

// Import Header Component
import Header from './components/header/header.component'

// Import GlobalStyls CSS in JS
import {GlobalStyle} from './global.syles';

// Import auth from firebase utiils
// Import selectors to pass into mapStateToProps
import {selectCurrentUser} from './redux/user/user.selectors';
// import checkUserSession for user persistence (passed into dispatch)
import {checkUserSession} from './redux/user/user.actions';
import Spinner from "./components/spinner/spinner.component";

// Lazy import all components rendered in the Route components
// to enable code-splitting - they will only load when needed
// To do this, we dynamically import the components using the
// lazy function from React. We declare the component in a const,
// then use the lazy function, which takes an anonymous function
// that calls import, which gets the string of component file path
const HomePage = lazy(() =>
    import('./pages/homepage/homepage.component'));
const ShopPage = lazy(() =>
    import('./pages/shop/shop.component'));
const CheckoutPage = lazy(() =>
    import('./pages/checkout/checkout.component'));
const SignInAndSignUp = lazy(() =>
    import('./pages/sign-in-and-sign-up/sign-in-and-sign-up.component'));

// Now that we are using Hooks, we can convert this component
// to a functional component
// Destructure the checkUserSession from mapDispatchToProps
// Destructure the currentUser from mapStateToProps
const App = ({checkUserSession, currentUser}) => {
    // We use the useEffect() Hook to replace the
    // componentDidMount() method
    useEffect(() => {
        // Instantiate checkUserSession to listen to user state
        checkUserSession();
        // As we want this to behave as a componentDidMount() and
        // we only want this to render when our checkUserSession
        // value changes, we pass that prop into the array
    }, [checkUserSession]);

    // After importing the GlobalSyle component, we put it above
    // the first component in the return method
    // We also use the Suspense component, which wraps around the
    // Routes being lazy loaded. This takes a fallback property,
    // which in our case is the Spinner component, which is shown
    // while the actual desired component is being rendered
    return (
        <div>
            <GlobalStyle/>
            <Header/>
            <Switch>
                <Suspense fallback={<Spinner/>}>
                    <Route exact path='/' component={HomePage}/>
                    <Route path='/shop' component={ShopPage}/>
                    <Route exact path='/checkout' component={CheckoutPage}/>
                    <Route
                        exact
                        path='/signin'
                        render={() =>
                            currentUser ?
                                (<Redirect to='/'/>)
                                :
                                (<SignInAndSignUp/>)
                        }
                    />
                </Suspense>
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
