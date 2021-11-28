import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface GlobalSlice {
    token: string | null
}

const initialState: GlobalSlice = {
    token: null,
};

export const globalSlice = createSlice({
    name: 'global',
    initialState,
    reducers: {
        setToken: (state, action: PayloadAction<string | null>) => {
            state.token = action.payload
        },
    },
});

export const { setToken } = globalSlice.actions;

export const selectToken = (state: any): string | null => state.global.token;

export default globalSlice.reducer