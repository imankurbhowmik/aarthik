import { createSlice } from "@reduxjs/toolkit";


const tokenFromStorage = localStorage.getItem("token");
const userDataFromStorage = localStorage.getItem("userData");

const initialState = {
  status: !!tokenFromStorage,
  userData: userDataFromStorage ? JSON.parse(userDataFromStorage) : null,
  token: tokenFromStorage || null
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.status = true;
            state.userData = action.payload.userData;
            state.token = action.payload.token
        },
        logout: (state) => {
            state.status = false;
            state.userData = null;
            state.token = null
        }
     }
})

export const {login, logout} = authSlice.actions;

export default authSlice.reducer;