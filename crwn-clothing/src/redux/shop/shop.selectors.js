import { createSelector } from 'reselect';

// Create input selector to get the shop reducer part of the rootReducer
const selectShop = state => state.shop;

// Create output selector to select the collections
// part of the shopReducer
export const selectShopCollections = createSelector(
    [selectShop],
    shop => shop.collections
);
