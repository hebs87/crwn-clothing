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
const CustomButton = ({ children, ...otherProps }) => (
    <button className='custom-button' { ...otherProps } >
        { children }
    </button>
);

export default CustomButton;