import React from 'react';
// Import CollectionItem
import CollectionItem from '../collection-item/collection-item.component'
// Import styles.scss file
import './collection-preview.styles.scss';

const CollectionPreview = ({ title, items }) => (
    <div className='collection-preview'>
        <h1 className='title'>{ title.toUpperCase() }</h1>
        <div className='preview'>
            {items
                // Filter this to show first 4 items
                .filter((item, idx) => idx < 4)
                // Map over the 4 items and display the props
                .map(({ id, ...otherItemProps }) => (
                <CollectionItem key={id} { ...otherItemProps } />
            ))}
        </div>
    </div>
);

export default CollectionPreview;