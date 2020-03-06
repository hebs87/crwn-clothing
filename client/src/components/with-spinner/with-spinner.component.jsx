import React from 'react';
// Import Spinner component
import Spinner from "../spinner/spinner.component";

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
const WithSpinner = WrappedComponent => ({isLoading, ...otherProps}) => {
    return isLoading ? <Spinner/> : <WrappedComponent {...otherProps}/>;
};

export default WithSpinner;
