import React from 'react';
// Import the SignIn Component
import SignIn from '../../components/sign-in/sign-in.component';
// Import the SignUp Component
import SignUp from '../../components/sign-up/sign-up.component';
// Import style sheet
import './sign-in-and-sign-up.styles.scss';

const SignInAndSignUpPage = () => (
    <div className='sign-in-and-sign-up'>
        <SignIn />
        <SignUp />
    </div>
)

export default SignInAndSignUpPage;
