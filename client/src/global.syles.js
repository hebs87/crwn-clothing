// Allows us to create a global style
import {createGlobalStyle} from 'styled-components';

// We create a GlobalStyle component and pass it our
// global styles in the backticks
// Media queries should be nested within the relevant
// selector that they are intended for
export const GlobalStyle = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css?family=Open+Sans+Condensed:300&display=swap');

    body {
        font-family: 'Open Sans Condensed';
        padding: 20px 40px;
        
        @media screen and (max-width: 800px) {
            padding: 10px;
        }
    }
    
    a {
        text-decoration: none;
        color: black;
    }
    
    * {
        box-sizing: border-box;
    }
`;
