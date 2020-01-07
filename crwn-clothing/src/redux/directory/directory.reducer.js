// Import the directory data
import DIRECTORY_DATA from './directory.data'

// Set the initial state
const INITIAL_STATE = {
    sections: DIRECTORY_DATA
};

// Build the reducer
const directoryReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        // We only initially need a default in here, as
        // we only want to return out initial state
        default:
            return state;
    }
};

export default directoryReducer;