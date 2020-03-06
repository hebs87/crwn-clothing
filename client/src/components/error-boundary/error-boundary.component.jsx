import React from "react";
// Import styled components for error page
import {
    ErrorImageOverlay,
    ErrorImageContainer,
    ErrorImageText
} from './error-boundary.styles';

// We declare an ErrorBoundary class component, as we
// need access to the two lifecycle methods
class ErrorBoundary extends React.Component {
    // First, we need to set the initial error state
    constructor(props) {
        super(props);

        this.state = {
            hasErrored: false
        };
    };

    // This is the first lifecycle method. It catches
    // any error that gets thrown in any of the
    // children of the component - any component that
    // it wraps around. The error gets passed in as
    // the param of this method
    static getDerivedStateFromError(error) {
        // We can process the error here if needed and
        // do whatever we need to

        // We need to return an object that will set
        // the state. Here, we say that the hasErrored
        // value goes to true. It lets us know that a
        // child component has thrown an error
        return {hasErrored: true}
    };

    // This is the second lifecycle method. It gives
    // us access to both the error and the info related
    // to the error, and how it got thrown. Info might
    // be which component threw the error
    componentDidCatch(error, errorInfo) {
        // We can console.log the error so we can see it
        console.log(error, errorInfo);
    };

    // We then want to render different UI, depending on
    // the local state of the hasErrored prop
    render() {
        return this.state.hasErrored ? (
                // If there is an error, we render an error page
                <ErrorImageOverlay>
                    <ErrorImageContainer
                        imageUrl={'https://i.imgur.com/lKJiT77.png'}
                    />
                    <ErrorImageText>
                        Sorry, this page is broken!
                    </ErrorImageText>
                </ErrorImageOverlay>
            )
            :
            (
                // If no error, we render the children
                this.props.children
            )
    };
}

export default ErrorBoundary;
