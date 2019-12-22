import React from 'react';
// Import SHOP_DATA from the js file for the state
import SHOP_DATA from './shop.data';
// Import CollectionPreview component
import CollectionPreview from '../../components/collection-preview/collection-preview.component'

class ShopPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            collections: SHOP_DATA
        }
    }

    render() {
        // Destructure collections items
        const { collections } = this.state;
        return (
            <div className='shop-page'>
                {
                    collections.map(({ id, ...otherCollectionProps }) => (
                        <CollectionPreview key={id} {...otherCollectionProps} />
                    ))
                }
            </div>
        )
    }
}

export default ShopPage;