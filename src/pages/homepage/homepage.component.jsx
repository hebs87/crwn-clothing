import React from 'react';
// Import .scss file
import './homepage.styles.scss'
// Import Directory
import Directory from '../../components/directory/directory.component';

const HomePage = () => (
    <div className='homepage'>
        <Directory />
    </div>
);

export default HomePage;