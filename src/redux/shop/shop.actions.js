import ShopActionTypes from './shop.types';

// The action takes the collectionsMap and sets that
// as the value for the payload
export const updateCollections = collectionsMap => ({
    type: ShopActionTypes.UPDATE_COLLECTIONS,
    payload: collectionsMap
});
