import { createSelector } from 'reselect';

// Create input selector to get the shop reducer part of the rootReducer
const selectShop = state => state.shop;

// Create output selector to select the collections
// part of the shopReducer
export const selectShopCollections = createSelector(
    [selectShop],
    shop => shop.collections
);

// This selector will use the selectShopCollections selector
// We use 'currying' to create a function that takes the
// collectionUrlParam (hats/jackets, etc.) and then uses the
// createSelector method to take the collections from the
// selectShopCollections selector. It finds the collections
// at the collectionUrlParam (the string that is passed in
// from the mapStateToProps function in the Collection file)
export const selectShopCollection = collectionUrlParam =>
    createSelector(
        [selectShopCollections],
        collections => 
            collections[collectionUrlParam]
    );
