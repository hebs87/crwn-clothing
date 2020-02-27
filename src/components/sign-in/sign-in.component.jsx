import React, { useState } from 'react';
import { connect } from 'react-redux';
// Import FormInput
import FormInput from '../form-input/form-input.component'
// Import CustomButton
import CustomButton from '../custom-button/custom-button.component'
// Import our actions to enable the sagas
import {
    googleSignInStart,
    emailSignInStart
} from '../../redux/user/user.actions';
// Import styled components
import {
    SignInContainer,
    SignInTitle,
    ButtonsBarContainer
} from './sign-in.styles';

// Now that we are using Hooks, we can convert this component
// to a functional component, instead of a class component
// We need to destructure emailSignInStart & googleSignInStart
// to enable passing them in to the inner component
const SignIn = ({ emailSignInStart, googleSignInStart }) => {
    // We are using Hooks, so we no longer need a
    // constructor method to set the state. Instead,
    // we use the useState() Hook and we pass in the
    // object containing the email and password
    const [userCredentials, setCredentials] = useState({
        email: '',
        password: ''
    });

    // We need to destructure our email and password from
    // userCredentials, so that we can use the auth's
    // signInWithEmailAndPassword method to varify the
    // details. If they are correct, we sign the user in
    const { email, password } = userCredentials;

    // We want full control over what the submit will do,
    // so we use preventDefault to stop this and specify
    // what needs to be done
    // We then pass this in to the form onSubmit attribute
    // As we are using Hooks to set the state, we need to
    // make this its own function
    const handleSubmit = async event => {
        event.preventDefault();
        // Then we call our emailSignInStart and pass in our
        // email and password
        emailSignInStart(email, password);
    };

    // When there is a change to the form fields, we want
    // to pull the input field's name and value - the target
    // is the input field itself
    // We will then dynamically set the state to the relevant
    // data, so the name will be that of the input field and
    // the value will be its value ()
    // As we are using Hooks to set the state, we need to
    // make this its own function
    const handleChange = event => {
        const { value, name } = event.target;
        // To set the state, we use setCredentials from the Hook
        // and we spread in our user credentials, and just update
        // the value that needs to be changed
        setCredentials({
            ...userCredentials,
            [name]: value
        });
    }

    // We no longer need the render method, as this is now a
    // functional component
    return (
        <SignInContainer>
            <SignInTitle>I already have an account</SignInTitle>
            <span>Sign in with your email and password</span>

            <form onSubmit={ handleSubmit }>
                <FormInput
                    name="email"
                    type="email"
                    value={ email }
                    handleChange={ handleChange }
                    label="Email"
                    required
                />
                <FormInput
                    name="password"
                    type="password"
                    value={ password }
                    handleChange={ handleChange }
                    label="Password"
                    required
                />

                <ButtonsBarContainer>
                    <CustomButton
                        type='submit'
                    >Sign In
                        </CustomButton>
                    <CustomButton
                        type='button'
                        onClick={googleSignInStart}
                        isGoogleSignIn
                    >
                        Sign In With Google
                        </CustomButton>
                </ButtonsBarContainer>
            </form>
        </SignInContainer>
    );
};

const mapDispatchToProps = dispatch => ({
    googleSignInStart: () => dispatch(googleSignInStart()),
    // In the function, we get back the email and password,
    // which we pass into our emailSignInStart action as an
    // object where the keys go to the values
    emailSignInStart: (email, password) =>
        dispatch(emailSignInStart({ email, password }))
});

export default connect(
    null,
    mapDispatchToProps
)(SignIn);
