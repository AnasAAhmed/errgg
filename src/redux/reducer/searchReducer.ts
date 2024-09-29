import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SearchReducerInitialState } from "../../types/reducer-types";

const initialState: SearchReducerInitialState = {
    searches: [''],
    loading: false,
};

export const searchReducer = createSlice({
    name: "searchReducer",
    initialState,
    reducers: {
        setSearches: (state, action: PayloadAction<string[]>) => {
            state.loading = false;
            // Ensure unique product names
            state.searches = Array.from(new Set([...state.searches!, ...action.payload]));
        },
        resetSearches: (state) => {
            state.searches = ['']; // Reset to empty or you could use `[]` if you prefer
            state.loading = false;
        },
    },
});

export const { setSearches, resetSearches } = searchReducer.actions;
