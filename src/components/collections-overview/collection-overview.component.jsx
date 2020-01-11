import React from 'react';
// Import connect HOC to enable pulling props from state
import { connect } from 'react-redux';
// Import createStructured selector to allow multiple selector calls
import { createStructuredSelector } from 'reselect';
// Import shop selector to pass in to mapStateToProps
import { selectShopCollectionsForPreview } from '../../redux/shop/shop.selectors';
// Import CollectionPreview component
import CollectionPreview from '../collection-preview/collection-preview.component'
// Import styled components
import { CollectionsOverviewContainer } from './collections-overview.styles';

const CollectionsOverview = ({ collections }) => (
    <CollectionsOverviewContainer>
        {
            collections.map(({ id, ...otherCollectionProps }) => (
                <CollectionPreview key={id} {...otherCollectionProps} />
            ))
        }
    </CollectionsOverviewContainer>
);

const mapStateToProps = createStructuredSelector({
    collections: selectShopCollectionsForPreview
});

export default connect(mapStateToProps)(CollectionsOverview);
