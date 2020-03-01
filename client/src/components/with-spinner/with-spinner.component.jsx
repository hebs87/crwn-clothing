import React from 'react';
// import styled components
import {
    SpinnerContainer,
    SpinnerOverlay
} from './with-spinner.styles';

// We declare our HOC, which is a component that
// takes some component and returns a new functional
// component. In this example, WithSpinner component
// takes a WrappedComponent, which takes a functional
// component. This component is passed into the other
// component, which gets the isLoading prop, as well
// as all the other props that the WrappedComponent
// gets. That component then renders either the spinner,
// depending on our isLoading prop, or the
// WrappedComponent with all the other props
const WithSpinner = WrappedComponent => {
    // We create our Spinner component and render the
    // logic in it
    const Spinner = ({ isLoading, ...otherProps }) => {
        return isLoading ? (
            <SpinnerOverlay>
                <SpinnerContainer />
            </SpinnerOverlay>
        ) : (
            <WrappedComponent { ...otherProps } />
        )
    };
    // We need to return the Spinner component here,
    // that way if we want to use the spinner, we use
    // it in the same way as the WrappedComponent,
    // but we pass it the isLoading prop and declare
    // the boolean value for the component
    return Spinner;
};

export default WithSpinner;
