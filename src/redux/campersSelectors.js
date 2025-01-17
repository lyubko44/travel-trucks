import { createSelector } from 'reselect';

const selectCampersState = (state) => state.campers;

export const selectFavorites = createSelector(
    [selectCampersState],
    (campersState) => campersState.campers.filter(camper => camper.isFavorite)
);

export const selectVisibleCampers = createSelector(
    [selectCampersState],
    (campersState) => campersState.visibleItems
);