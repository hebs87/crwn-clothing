import React from 'react';
// Import connect HOC to enable pulling props from state
import { connect } from 'react-redux';
// Import createStructured selector to allow multiple selector calls
import { createStructuredSelector } from 'reselect';
// Import shop selector to pass in to mapStateToProps
import { selectShopCollections } from '../../redux/shop/shop.selectors';
// Import CollectionPreview component
import CollectionPreview from '../../components/collection-preview/collection-preview.component'

const CollectionOverview = ({ collections }) => (
    <div className='collection-overview'>
        {
            collections.map(({ id, ...otherCollectionProps }) => (
                <CollectionPreview key={id} {...otherCollectionProps} />
            ))
        }
    </div>
);

const mapStateToProps = createStructuredSelector({
    collections: selectShopCollections
});

export default connect(mapStateToProps)(CollectionOverview);
