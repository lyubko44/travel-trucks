import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    campers: [],
    filteredCampers: [],
    isLoading: false,
    error: null,
};

export const fetchCampers = createAsyncThunk('campers/fetchCampers', async () => {
    const response = await axios.get('https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers');
    return Array.isArray(response.data) ? response.data : []; // Ensure this returns an array
});

const campersSlice = createSlice({
    name: 'campers',
    initialState,
    reducers: {
        filterCampers: (state, action) => {
            const { location, selectedType, selectedFeatures } = action.payload;
            state.filteredCampers = state.campers.filter(camper => {
                return (
                    (!location || camper.location.includes(location)) &&
                    (!selectedType || camper.type === selectedType) &&
                    selectedFeatures.every(feature => camper.features.includes(feature))
                );
            });
        },
        toggleFavorite: (state, action) => {
            const camper = state.campers.find(camper => camper.id === action.payload);
            if (camper) {
                camper.isFavorite = !camper.isFavorite;
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCampers.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchCampers.fulfilled, (state, action) => {
                state.isLoading = false;
                state.campers = action.payload; // Ensure this is an array
                state.filteredCampers = action.payload;
            })
            .addCase(fetchCampers.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            });
    },
});

export const { filterCampers, toggleFavorite } = campersSlice.actions;

export const selectFilteredCampers = (state) => state.campers.filteredCampers;
export const selectLoading = (state) => state.campers.isLoading;

export default campersSlice.reducer;