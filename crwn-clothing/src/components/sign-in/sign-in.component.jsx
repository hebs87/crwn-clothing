import React from 'react';
// Import FormInput
import FormInput from '../form-input/form-input.component'
// Import CustomButton
import CustomButton from '../custom-button/custom-button.component'
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
    handleSubmit = event => {
        event.preventDefault();

        this.setState({ email: '', password: '' })
    }

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
                <h2>I already have an account</h2>
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
                </form>

                <CustomButton type='submit' >Sign In</CustomButton>
            </div>
        )
    }
}

export default SignIn;