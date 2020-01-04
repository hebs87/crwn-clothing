import React from 'react';
// Import style sheet
import './custom-button.styles.scss';

// The function will take the parameters of children
// and ...otherProps - we want to destructure the
// children from the props so we can set the value of
// the button to what we want. We also want to pass in
// ...otherProps so that we can give the button a type
// of submit, which will ensure that the form's
// onSubmit function will be triggered when pressed
// We pass in the isGoogleSignIn prop to our button,
// so if it is the Google Sign In button, we add the
// google-sign-in class
// We pass in the inverted prop to our button,
// so if it is the Add To Cart button, we add the
// inverted class
const CustomButton = ({ children, isGoogleSignIn, inverted, ...otherProps }) => (
    <button
        className={
            `${inverted ? 'inverted' : ''}
            ${isGoogleSignIn ? 'google-sign-in' : ''}
            custom-button`
        } { ...otherProps } >
        { children }
    </button>
);

export default CustomButton;