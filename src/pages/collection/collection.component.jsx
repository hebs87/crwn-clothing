import React from 'react';
// Import connect to enable pulling props from state
import { connect } from 'react-redux';
// Import CollectionItem that displays the item
import CollectionItem from '../../components/collection-item/collection-item.component';
// Import selectShopCollection selector to get relevant collection
import { selectShopCollection } from '../../redux/shop/shop.selectors';

// Import styled components
import {
    CollectionPageContainer,
    CollectionTitle,
    CollectionItemsContainer
} from './collection.styles';

const CollectionPage = ({ collection }) => {
    // Destructure our title and items from the
    // collection prop
    const { title, items } = collection;
    return (
        <CollectionPageContainer>
            <CollectionTitle>{ title }</CollectionTitle>
            <CollectionItemsContainer>
                {
                    // We map over our items and display
                    // them in the CollectionItem component
                    items.map(item => (
                        <CollectionItem
                            key={ item.id }
                            item={ item }
                        />
                    ))
                }
            </CollectionItemsContainer>
        </CollectionPageContainer>
    )
};

// state is the overall state of the root reducer
// ownProps is the second, optional parameter of
// mapStateToProps. It is the props of the component
// that we are wrapping with our connect() method
// We need this so that we can use the match prop
// that was passed in from the Route component in
// the App.js file and then the ShopPage
// In the function, we call the selectShopCollection
// which takes the ownProps.match.params.collectionId
// argument (this gives us the string of the URL).
// This argument is passed into the selector's function
// as the collectionUrlParam and is then compared
// to the map that we created for the selector
// We also MUST pass in the state, because this
// selector needs a part of the state, depending on
// the URL parameter
const mapStateToProps = (state, ownProps) => ({
    collection: selectShopCollection(ownProps.match.params.collectionId)(state)
});

export default connect(mapStateToProps)(CollectionPage);
