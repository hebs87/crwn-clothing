import { createSelector } from 'reselect';

// Create input selector to get the shop reducer part of the rootReducer
const selectShop = state => state.shop;

// Create output selector to select the collections
// part of the shopReducer
export const selectShopCollections = createSelector(
    [selectShop],
    shop => shop.collections
);

// Following data normalization, we now need to convert
// the object's keys to an array, so that the CollectionsOverview
// component can use these array values to map over the
// collections and then pass them in to the CollectionPreview
export const selectShopCollectionsForPreview = createSelector(
    // We get the object
    [selectShopCollections],
    // keys() converts the values of the collections keys to an
    // array (['hats', 'jackets', etc.]), and we then use map()
    // to map over the array of keys and return the collections
    // at that key value
    collections => Object.keys(collections).map(key => collections[key])
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