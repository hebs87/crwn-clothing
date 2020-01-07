import React from 'react';
// Import CollectionOverview
import CollectionOverview from '../../components/collection-overview/collection-overview.component';

const ShopPage = ({ collections }) => (
    <div className='shop-page'>
        <CollectionOverview />
    </div>
);

export default ShopPage;
