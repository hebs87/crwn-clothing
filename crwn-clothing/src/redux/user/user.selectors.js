import { createSelector } from 'reselect';

// Input selector to get user reducer
const selectUser = state => state.user;

// Output selectors
// Gets the current user
export const selectCurrentUser = createSelector(
    [selectUser],
    user => user.currentUser
);
