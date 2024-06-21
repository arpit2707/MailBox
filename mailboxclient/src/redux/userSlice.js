import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: { name: "", email: "", phone: null, token: "" },
  setUser: (state, action) => {
    state.name = action.payload.name;
    state.email = action.payload.email;
    state.phone = action.payload.phone;
  },
  setToken: (state, action) => {
    state.token = action.payload.token;
  },
});

export const { setUser, setToken } = userSlice.actions;
export default userSlice.reducer;
