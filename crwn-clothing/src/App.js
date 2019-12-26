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
// Import auth from firebase utiils
import { auth, createUserProfileDocument } from './firebase/firebase.utils';

class App extends React.Component {
    constructor() {
        super();
        
        // We set the user state to null initially when no user
        // is signed in
        this.state = {
            currentUser: null
        }
    }

    // We set the initial unsibscribeFromAuth value to null
    // to enable us to close the session when we unmount
    unsubscribeFromAuth = null;

    componentDidMount() {
        // The onAuthStateChanged is a method from our auth library
        // that enables us to set the session state to the user details
        // It takes an async function in which we set the
        // createUserProfileDocument param to the user object, if the
        // userAuth exists
        this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
            if (userAuth) {
                const userRef = await createUserProfileDocument(userAuth);
                
                // Here, we call the onSnapshot method to get a snapshot
                // of the user's data and we set the state to those details
                // (the user's ID and the rest of the snapshot data)
                userRef.onSnapshot(snapShot => {
                    this.setState({
                        currentUser: {
                            id: snapShot.id,
                            ...snapShot.data()
                        }
                    });
                });
            } else {
                // If the user logs out, we set the state back to userAuth,
                // which will be null
                this.setState({ currentUser: userAuth });
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
                <Header currentUser={ this.state.currentUser } />
                <Switch>
                    <Route exact path='/' component={ HomePage } />
                    <Route path='/shop' component={ ShopPage } />
                    <Route path='/signin' component={ SignInAndSignUp } />
                </Switch>
            </div>
        );
    }
}

export default App;
