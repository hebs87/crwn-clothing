const ShopActionTypes = {
    // Initial type that we created
    // UPDATE_COLLECTIONS: 'UPDATE_COLLECTIONS'
    // Once we are at the stage of wanting to move
    // our asynchronous get call from our Shop
    // component into our reducer instead, we need
    // to create new types for each stage of the
    // asynchronous process
    // This call tells Redux we are starting to
    // fetch the data - before any data is fetched
    FETCH_COLLECTIONS_START: 'FETCH_COLLECTIONS_START',
    // This call is for when our data call comes back
    // succefully, hopefully with the data
    FETCH_COLLECTIONS_SUCCESS: 'FETCH_COLLECTIONS_SUCCESS',
    // This call is for when our data call fails - if
    // data connection is poor, connection is down, etc.
    FETCH_COLLECTIONS_FAILURE: 'FETCH_COLLECTIONS_FAILURE'
};

export default ShopActionTypes;
