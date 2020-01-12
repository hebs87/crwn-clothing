import React from 'react';
// Import FormInput for our form
import FormInput from '../form-input/form-input.component';
// Import CustomButton for our form's buttons
import CustomButton from '../custom-button/custom-button.component';
// Import auth and createUserProfileDocument for signing up
import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';
// Import styled components
import {
    SignUpContainer,
    SignUpTitle
} from './sign-up.styles';

// We want to set a state so we create a Class component
class SignUp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            displayName: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    }

    handleSubmit = async event => {
        // We want to prevent the default when the form is submitted
        event.preventDefault();
        // We destructure all the props from the state
        const { displayName, email, password, confirmPassword } = this.state;
        // If the passwords don't match, we display an alert
        if (password !== confirmPassword) {
            alert("Passwords don't match");
            return;
        }
        // If the passwords do match, we have a try-catch error block
        // createUserWithEmailAndPassword is a method from the auth
        // library which create use with email address and password,
        // and then returns the user back to us. So here, we want to
        // destructure the user that is returned from that method
        // Once that's done, we then want to createUserProfileDocument
        // which has the values of the user and the displayName object
        // We then set the state back to the original state
        try {
            const { user } = await auth.createUserWithEmailAndPassword(email, password);

            await createUserProfileDocument(user, { displayName });

            this.setState({
                displayName: '',
                email: '',
                password: '',
                confirmPassword: ''
            });
        } catch(error) {
            console.error(error);
        }
    };

    // This is the same as the sign in method
    handleChange = event => {
        const { name, value } = event.target;

        this.setState({ [name]: value });
     }

    render() {
        // Destructure props from our state
        const { displayName, email, password, confirmPassword } = this.state;

        return(
            <SignUpContainer>
                <SignUpTitle>I do not have an account</SignUpTitle>
                <span>Sign up with your email and password</span>

                <form className='sign-up-form' onSubmit={this.handleSubmit}>
                    <FormInput
                        type='text'
                        name='displayName'
                        value={ displayName }
                        handleChange={ this.handleChange }
                        label='Display Name'
                        required
                    />
                    <FormInput
                        type='email'
                        name='email'
                        value={ email }
                        handleChange={ this.handleChange }
                        label='Email'
                        required
                    />
                    <FormInput
                        type='password'
                        name='password'
                        value={ password }
                        handleChange={ this.handleChange }
                        label='Password'
                        required
                    />
                    <FormInput
                        type='password'
                        name='confirmPassword'
                        value={ confirmPassword }
                        handleChange={ this.handleChange }
                        label='Confirm Password'
                        required
                    />

                    <CustomButton type='submit'>SIGN UP</CustomButton>
                </form>
            </SignUpContainer>
        );
    }
}

export default SignUp;
