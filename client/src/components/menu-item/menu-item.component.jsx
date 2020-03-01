import React from 'react';
// Import withRouter() to enable the avodiance of prop drilling
import { withRouter } from 'react-router-dom';
// Import styled components
import {
    MenuItemContainer,
    BackgroundImageContainer,
    ContentContainer,
    ContentTitle,
    ContentSubtitle
} from './menu-item.styles';

// We want to dynamically generate the title,
// so we need to deconstruct it in the function parameters
// We pass in the imageUrl and set it as the background
// image of the menu-item div, but we need to set it as a
// style on the element and use literal templating to pass
// in the imageUrl, which enables it to dynamically change
// if we change the root imageUrl
// We also want to add the size to our className, if it
// is present (in the raw json data)
// Once we pass in the linkUrl and history props, we can
// give the menu-item div an onClick argument, which takes
// a function to return the relevant URL
const MenuItem = ({ title, imageUrl, size, history, linkUrl, match }) => (
    <MenuItemContainer
        size={size}
        onClick={() => history.push(`${match.url}${linkUrl}`)}
    >
        <BackgroundImageContainer
            className='background-image'
            imageUrl={ imageUrl }>
        </BackgroundImageContainer>
        <ContentContainer>
            <ContentTitle>{ title.toUpperCase() }</ContentTitle>
            <ContentSubtitle>SHOP NOW</ContentSubtitle>
        </ContentContainer>
    </MenuItemContainer>
);

export default withRouter(MenuItem);
