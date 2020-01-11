// Import css to allow us to create reusable
// style snippets that share the same styles
import styled, { css } from 'styled-components';

// We want to call the css library to make a
// reusable CSS styles snippet that can be used
// by the relevant components - this avoids us 
// repeating our CSS styles in two different
// components that share the same styles

// Create our buttonStyles - the styles used that
// conflict with the invertedButtonStyles
const buttonStyles = css`
  background-color: black;
  color: white;
  border: none;
  
  &:hover {
    background-color: white;
    color: black;
    border: 1px solid black;
  }
`;

// Create our invertedButtonStyles
const invertedButtonStyles = css`
  background-color: white;
  color: black;
  border: 1px solid black;

  &:hover {
    background-color: black;
    color: white;
    border: none;
  }
`;

// Create our googleSignInStyles
const googleSignInStyles = css`
  background-color: #4285f4;
  color: white;
  border: none;

  &:hover {
    background-color: #357ae8;
  }
`;

// We create a function that uses the googleSignInStyles
// if the isGoogleSignIn prop/class is present in the
// button; the invertedButtonStyles if the inverted prop/
// class is present, or the buttonStyles if neither is
// present
const getButtonStyles = props => {
    if (props.isGoogleSignIn) {
        return googleSignInStyles;
    };

    return props.inverted ? invertedButtonStyles : buttonStyles;
}

// Create our base CustomButtonContainer
// We call the getButtonStyles function in it,
// which ensures the correct CSS style snippet
// is called, depending on the props/class that
// are passed in
export const CustomButtonContainer = styled.button`
  min-width: 165px;
  width: auto;
  height: 50px;
  letter-spacing: 0.5px;
  line-height: 50px;
  padding: 0 35px 0 35px;
  font-size: 15px;
  text-transform: uppercase;
  font-family: 'Open Sans Condensed';
  font-weight: bolder;
  cursor: pointer;
  display: flex;
  justify-content: center;

  ${ getButtonStyles }
`;
