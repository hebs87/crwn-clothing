import React, { useState } from 'react';
import { connect } from 'react-redux';
// Import FormInput for our form
import FormInput from '../form-input/form-input.component';
// Import CustomButton for our form's buttons
import CustomButton from '../custom-button/custom-button.component';
// Import our action so we can dispatch it into our component
import { signUpStart } from '../../redux/user/user.actions';

// Import styled components
import {
    SignUpContainer,
    SignUpTitle
} from './sign-up.styles';

// Now that we are using Hooks, we can convert this component
// to a functional component, instead of a class component
// We need to destructure the relevant props to enable passing
// them in to the inner component
const SignUp = ({ signUpStart }) => {
    // We are using Hooks, so we no longer need a
    // constructor method to set the state. Instead,
    // we use the useState() Hook and we pass in the
    // object containing the displayName, email, password
    // and confirmPassword, which are all initially
    // empty strings
    const [userCredentials, setCredentials] = useState({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    // We destructure all the props from the state
    const { displayName, email, password, confirmPassword } = userCredentials;

    // Now that we are using Hooks, we can convert this component
    // to a functional component, instead of a class component
    const handleSubmit = async event => {
        // We want to prevent the default when the form is submitted
        event.preventDefault();
        // If the passwords don't match, we display an alert
        if (password !== confirmPassword) {
            alert("Passwords don't match");
            return;
        }
        // If the passwords do match, we call our signUpStart
        // method and pass in the email, password and displayName
        // These are the userCredentials that get passed in our
        // mapDispatchToProps
        signUpStart({ email, password, displayName });
    };

    // This is the same as the sign in method
    // This is the same as the sign in method
    // Now that we are using Hooks, we can convert this component
    // to a functional component, instead of a class component
    const handleChange = event => {
        const { name, value } = event.target;

        setCredentials({
            ...userCredentials,
            [name]: value
        });
    }

    return (
        <SignUpContainer>
            <SignUpTitle>I do not have an account</SignUpTitle>
            <span>Sign up with your email and password</span>

            <form className='sign-up-form' onSubmit={handleSubmit}>
                <FormInput
                    type='text'
                    name='displayName'
                    value={displayName}
                    handleChange={handleChange}
                    label='Display Name'
                    required
                />
                <FormInput
                    type='email'
                    name='email'
                    value={email}
                    handleChange={handleChange}
                    label='Email'
                    required
                />
                <FormInput
                    type='password'
                    name='password'
                    value={password}
                    handleChange={handleChange}
                    label='Password'
                    required
                />
                <FormInput
                    type='password'
                    name='confirmPassword'
                    value={confirmPassword}
                    handleChange={handleChange}
                    label='Confirm Password'
                    required
                />

                <CustomButton type='submit'>SIGN UP</CustomButton>
            </form>
        </SignUpContainer>
    );
};


// This allows us to dispatch the email, password
// and displayName credentials to our props
const mapDispatchToProps = dispatch => ({
    signUpStart: userCredentials =>
        dispatch(signUpStart(userCredentials))
});

export default connect(
    null,
    mapDispatchToProps
)(SignUp);
