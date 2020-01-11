import React from 'react';
// Import Directory
import Directory from '../../components/directory/directory.component';
// Import the styles.jsx file to use CSS in JS
import { HomePageContainer } from './homepage.styles';

const HomePage = () => (
    <HomePageContainer>
        <Directory />
    </HomePageContainer>
);

export default HomePage;
