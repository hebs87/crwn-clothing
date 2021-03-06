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
    // at that key value.
    // As pulling the data from the backend is an async function,
    // the data can be in a state of null. If that's the case, we
    // want to return an empty array. Then when the there is data,
    // we can map over it.
    collections => collections ? 
        Object.keys(collections).map(key => collections[key])
        :
        []
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
            // If the collections object doesn't exist,
            // we want to return a null value. If it does
            // exist, we want to return our collections
            (collections ?
                collections[collectionUrlParam]
                :
                null)
    );

// Once we've moved our fetching of the shop data
// functionality into our reducer and created the
// relevant actions, we create this selector to
// enable us to set the fetching state to use our
// spinner when loading the data
export const selectIsCollectionFetching = createSelector(
    [selectShop],
    shop => shop.isFetching
);

// This selector determines whether the collection
// request has loaded successfully, and returns us
// a boolean value of whether the collection is
// null or not - !! converts the truthy or falsy
// value to an actual boolean value
export const selectIsCollectionsLoaded = createSelector(
    [selectShop],
    shop => !!shop.collections
);
