import React from 'react';
// Import style sheet
import './menu-item.styles.scss';
// Import withRoute() to enable the avodiance of prop drilling

// We want to dynamically generate the title,
// so we need to deconstruct it in the function parameters
// We pass in the imageUrl and set it as the background
// image of the menu-item div, but we need to set it as a
// style on the element and use literal templating to pass
// in the imageUrl, which enables it to dynamically change
// if we change the root imageUrl
// We also want to add the size to our className, if it
// is present (in the raw json data)
const MenuItem = ({ title, imageUrl, size }) => (
    <div className={`${size} menu-item`}>
        <div
            className='background-image'
            style={{ backgroundImage: `url(${ imageUrl })` }}>
        </div>
        <div className='content'>
            <h1 className='title'>{ title.toUpperCase() }</h1>
            <span className='subtitle'>SHOP NOW</span>
        </div>
    </div>
);

export default MenuItem;