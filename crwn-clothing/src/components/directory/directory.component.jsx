import React from 'react';
// Import DIRECTORY_DATA for the default state
import DIRECTORY_DATA from './directory.data'
// Import style sheet
import './directory.styles.scss';
// Import MenuItem component
import MenuItem from '../menu-item/menu-item.component';

class Directory extends React.Component {
    constructor() {
        super();
        
        // We set the state here, which will be an array
        // of the data we want to pass into our directory items
        this.state = {
            sections: DIRECTORY_DATA
        };
    };

    render() {
        return (
            <div className='directory-menu'>
                {
                    // We want to map over our array and render the 
                    // MenuItem. We also want to destructure the
                    // props and pass in the relevant ones
                    // As the majority of props at the same as the arguments
                    // that we are passing into the MenuItem component, we can
                    // use the spread operator to pass them in at once
                    this.state.sections.map(({ id, ...otherSectionProps }) => (
                        <MenuItem
                            key={id}
                            { ...otherSectionProps }
                        />
                    ))
                }
            </div>
        );
    }
}

export default Directory;