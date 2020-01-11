import React from 'react';
// Import the styled component
import { CustomButtonContainer } from './custom-button.styles';

// The function will take the parameters of children
// and ...props - we want to destructure the
// children from the props so we can set the value of
// the button to what we want. We also want to pass in
// ...props so that we can give the button a type
// of submit, which will ensure that the form's
// onSubmit function will be triggered when pressed
// ...props also allows us to pass in the relevant
// prop/class from the styled component - the
// isGoogleSignIn prop/class will render the styles
// specific to that button; the inverted prop/class
// will render the styles specific to that button
const CustomButton = ({ children, ...props }) => (
    <CustomButtonContainer { ...props } >
        { children }
    </CustomButtonContainer>
);

export default CustomButton;
