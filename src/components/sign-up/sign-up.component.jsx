import React from 'react';
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
        // We need to destructure the signUpStart from our props
        const { signUpStart } = this.props;
        // We destructure all the props from the state
        const { displayName, email, password, confirmPassword } = this.state;
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
