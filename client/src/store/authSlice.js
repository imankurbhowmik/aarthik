import { createSlice } from "@reduxjs/toolkit";


const tokenFromStorage = localStorage.getItem("token");
const userDataFromStorage = localStorage.getItem("userData");

let parsedUserData = null;
try {
  if (userDataFromStorage && userDataFromStorage !== "undefined") {
    parsedUserData = JSON.parse(userDataFromStorage);
  }
} catch (err) {
  console.error("Invalid userData in localStorage");
  localStorage.removeItem("userData"); // Cleanup if corrupt
}

const initialState = {
  status: !!parsedUserData,
  userData: parsedUserData,
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