import { createSelector } from 'reselect';

// To enable us to render the correct collection, depending on
// which one the user navigates to, we need to create an object
// that maps the string value (hats, jackets, etc.) to the
// relevant ID, as the ID is a number value
const COLLECTION_ID_MAP = {
    hats: 1,
    sneakers: 2,
    jackets: 3,
    womens: 4,
    mens: 5
};

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
// selectShopCollections selector, and then use find() to
// get the collection.id matching the URL parameter of
// the COLLECTION_ID_MAP
export const selectShopCollection = collectionUrlParam =>
    createSelector(
        [selectShopCollections],
        collections => collections.find(
            collection => collection.id === COLLECTION_ID_MAP[collectionUrlParam]
        )
    );
