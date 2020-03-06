import React from 'react';
// import styled components
import {
    SpinnerContainer,
    SpinnerOverlay
} from './spinner.styles';

// This is just a presentational component that shows
// our SpinnerContainer with the SpinnerOverlay inside
const Spinner = () => (
    <SpinnerOverlay>
        <SpinnerContainer/>
    </SpinnerOverlay>
);

export default Spinner;
