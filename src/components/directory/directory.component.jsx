import React from 'react';
// Import connect HOC to enable pulling props from state
import { connect } from 'react-redux';
// Import createStructured selector to allow multiple selector calls
import { createStructuredSelector } from 'reselect';
// Import directory selector to pass in to mapStateToProps
import { selectDirectorySections } from '../../redux/directory/directory.selectors';
// Import MenuItem component
import MenuItem from '../menu-item/menu-item.component';
// Import style sheet
import './directory.styles.scss';

const Directory = ({ sections }) => (
    <div className='directory-menu'>
        {
            // We want to map over our array and render the 
            // MenuItem. We also want to destructure the
            // props and pass in the relevant ones
            // As the majority of props at the same as the arguments
            // that we are passing into the MenuItem component, we can
            // use the spread operator to pass them in at once
            sections.map(({ id, ...otherSectionProps }) => (
                <MenuItem
                    key={id}
                    { ...otherSectionProps }
                />
            ))
        }
    </div>
);

const mapStateToProps = createStructuredSelector ({
    sections: selectDirectorySections
});

export default connect(mapStateToProps)(Directory);