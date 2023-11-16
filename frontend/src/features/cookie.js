import { createSlice } from "@reduxjs/toolkit";


export const cookieSlice = createSlice({
    name: "cookie",
    initialState: { value: { numCookies: 0, cookiePerClick: 1, cookiesPerSecond: 0 } },
    reducers: {
        cookieCount: (state, action) => {
            state.value = action.payload
        },
    }
});

export const { cookieCount } = cookieSlice.actions

export default cookieSlice.reducer;           
