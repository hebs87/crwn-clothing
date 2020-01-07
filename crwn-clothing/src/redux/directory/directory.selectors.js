import { createSelector } from 'reselect';

// Create input selector to get the directory
// reducer part of the rootReducer
const selectDirectory = state => state.directory;

// Create output selector to select the sections
// part of the directoryReducer
export const selectDirectorySections = createSelector(
    [selectDirectory],
    directory => directory.sections
);
