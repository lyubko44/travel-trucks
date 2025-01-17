import {createSlice} from "@reduxjs/toolkit";
import {fetchCampers} from "./campersOperations.js";

const initialState = {
    campers: {
        items: [],
        loading: false,
        error: null,
        visibleItems: 4,
    },
    favorites: JSON.parse(localStorage.getItem("favorites")) || [],
};

const campersSlice = createSlice({
    name: "campers",
    initialState: initialState,
    reducers: {
        clearCampers: (state) => {
            state.campers.items = [];
            state.campers.loading = false;
            state.campers.error = null;
        },
        loadMoreCampers: (state) => {
            state.campers.visibleItems += 3;
        },
        resetVisibleItems: (state) => {
            state.campers.visibleItems = 4;
        },
        addToFavorites: (state, action) => {
            if (!state.favorites.some((fav) => fav.id === action.payload.id)) {
                state.favorites.push(action.payload);
                localStorage.setItem("favorites", JSON.stringify(state.favorites));
            }
        },
        removeFromFavorites: (state, action) => {
            state.favorites = state.favorites.filter(
                (favCamper) => favCamper.id !== action.payload.id
            );
            localStorage.setItem("favorites", JSON.stringify(state.favorites));
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCampers.pending, (state) => {
                state.campers.loading = true;
            })
            .addCase(fetchCampers.fulfilled, (state, action) => {
                state.campers.loading = false;
                state.campers.error = null;
                state.campers.items = action.payload;
            })
            .addCase(fetchCampers.rejected, (state, action) => {
                state.campers.loading = false;
                state.campers.error = action.payload;
            });
    },
});

export const {
    clearCampers,
    loadMoreCampers,
    resetVisibleItems,
    addToFavorites,
    removeFromFavorites,
} = campersSlice.actions;

export const campersReducer = campersSlice.reducer;

export const selectCampers = (state) => state.campersData.campers.items;
export const selectVisibleCampers = (state) => state.campersData.campers.visibleItems;
export const selectFavorites = (state) => state.campersData.favorites || [];
export const selectLoading = (state) => state.campersData.campers.loading;
export const selectError = (state) => state.campersData.campers.error;

export default campersSlice;