import React from 'react';
// Import connect HOC to enable pulling props from state
import { connect } from 'react-redux';
// Import createStructured selector to allow multiple selector calls
import { createStructuredSelector } from 'reselect';
// Import shop selector to pass in to mapStateToProps
import { selectShopCollectionsForPreview } from '../../redux/shop/shop.selectors';
// Import CollectionPreview component
import CollectionPreview from '../collection-preview/collection-preview.component'

const CollectionsOverview = ({ collections }) => (
    <div className='collection-overview'>
        {
            collections.map(({ id, ...otherCollectionProps }) => (
                <CollectionPreview key={id} {...otherCollectionProps} />
            ))
        }
    </div>
);

const mapStateToProps = createStructuredSelector({
    collections: selectShopCollectionsForPreview
});

export default connect(mapStateToProps)(CollectionsOverview);
