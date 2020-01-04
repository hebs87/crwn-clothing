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
                // We pass the whole item into the map,
                // set its ID as the key and then pass the
                // whole item into the props
                // This allows us to pass the item into
                // the redux dispatch function in the
                // collection-item file, which allows us to
                // pass the whole item into the cart
                .map((item) => (
                <CollectionItem key={item.id} item={item} />
            ))}
        </div>
    </div>
);

export default CollectionPreview;