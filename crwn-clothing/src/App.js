import React from 'react';
import './App.css';
// Import Header Component
import Header from './components/header/header.component'
// Import HomePage Component
import HomePage from './pages/homepage/homepage.component';
// Import SignInAndSignUp Component
import SignInAndSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component'
// Import ShopPage Component
import ShopPage from './pages/shop/shop.component'
// Import Switch and Route to enable routing
import { Switch, Route } from 'react-router-dom';
// Import connect to enable the app to access redux
import { connect } from 'react-redux';
// Import setCurrentUser action to enable us to set currentUser
import { setCurrentUser } from './redux/user/user.actions';
// Import auth from firebase utiils
import { auth, createUserProfileDocument } from './firebase/firebase.utils';

class App extends React.Component {
    // We set the initial unsibscribeFromAuth value to null
    // to enable us to close the session when we unmount
    unsubscribeFromAuth = null;

    componentDidMount() {
        // Destructure setCurrentUser from our props
        const {setCurrentUser} = this.props;
        // The onAuthStateChanged is a method from our auth library
        // that enables us to set the session state to the user details
        // It takes an async function in which we set the
        // createUserProfileDocument param to the user object, if the
        // userAuth exists
        this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
            if (userAuth) {
                const userRef = await createUserProfileDocument(userAuth);
                
                // Here, we call the onSnapshot method to get a snapshot
                // of the user's data and we set the currentUser value to
                // those details (user's ID and rest of the snapshot data)
                userRef.onSnapshot(snapShot => {
                    setCurrentUser({
                            id: snapShot.id,
                            ...snapShot.data()
                        });
                    });
            } else {
                // If the user logs out, we set the currentUser value
                // back to null
                setCurrentUser(userAuth);
            }
        });
    }

    // We close the session when the component unmounts
    componentWillUnmount() {
        this.unsubscribeFromAuth();
    }
    
    render () {
        return (
            <div>
                <Header />
                <Switch>
                    <Route exact path='/' component={ HomePage } />
                    <Route path='/shop' component={ ShopPage } />
                    <Route path='/signin' component={ SignInAndSignUp } />
                </Switch>
            </div>
        );
    }
}

// The mapDispatchToProps function takes the dispatch property
// and returns an object where the prop name will be whatever
// prop we want to pass in that dispatches the new action that
// we want to pass, which in this instance is setCurrentUser
const mapDispatchToProps = dispatch => ({
    // setCurrentUser is the prop, but it goes to a function
    // that gets the user object and then calls dispatch
    // dispatch lets redux know that whatever object it is
    // being passed is an action object that it needs to
    // pass to every reducer
    // So here, we call the setCurrentUser action and pass
    // in the user that will be used as the payload
    setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(null, mapDispatchToProps)(App);
