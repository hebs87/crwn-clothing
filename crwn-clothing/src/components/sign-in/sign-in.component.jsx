import React from 'react';
// Import FormInput
import FormInput from '../form-input/form-input.component'
// Import CustomButton
import CustomButton from '../custom-button/custom-button.component'
// Import signInWithGoogle
import { auth, signInWithGoogle } from '../../firebase/firebase.utils';
// Import style sheet
import './sign-in.styles.scss';

class SignIn extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        }
    }

    // We want full control over what the submit will do,
    // so we use preventDefault to stop this and specify
    // what needs to be done
    // We then pass this in to the form onSubmit attribute
    handleSubmit = async event => {
        event.preventDefault();

        // We need to destructure our email and password from
        // the state, so that we can use the auth's
        // signInWithEmailAndPassword method to varify the
        // details. If they are correct, we sign the user in
        const { email, password } = this.state;

        try {
            // Sign the user in if successful and then clear state
            await auth.signInWithEmailAndPassword(email, password);
            this.setState({ email: '', password: '' });
        } catch (error) {
            console.log(error);
        }
    };

    // When there is a change to the form fields, we want
    // to pull the input field's name and value - the target
    // is the input field itself
    // We will then dynamically set the state to the relevant
    // data, so the name will be that of the input field and
    // the value will be its value
    handleChange = event => {
        const { value, name } = event.target;

        this.setState({ [name]: value })
    }

    render() {
        return(
            <div className='sign-in'>
                <h2 className='title'>I already have an account</h2>
                <span>Sign in with your email and password</span>

                <form onSubmit={this.handleSubmit}>
                    <FormInput
                        name="email"
                        type="email"
                        value={this.state.email}
                        handleChange={this.handleChange}
                        label="Email"
                        required
                    />
                    <FormInput
                        name="password"
                        type="password"
                        value={this.state.password}
                        handleChange={this.handleChange}
                        label="Password"
                        required
                    />

                    <div className='buttons'>
                        <CustomButton type='submit'>Sign In</CustomButton>
                        <CustomButton onClick={ signInWithGoogle } isGoogleSignIn >
                            Sign In With Google
                        </CustomButton>
                    </div>
                </form>                
            </div>
        )
    }
}

export default SignIn;