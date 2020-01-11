import React from 'react';
// Import the SignIn Component
import SignIn from '../../components/sign-in/sign-in.component';
// Import the SignUp Component
import SignUp from '../../components/sign-up/sign-up.component';
// Import styled components
import { SignInAndSignUpContainer } from './sign-in-and-sign-up.styles';

const SignInAndSignUpPage = () => (
    <SignInAndSignUpContainer>
        <SignIn />
        <SignUp />
    </SignInAndSignUpContainer>
);

export default SignInAndSignUpPage;
