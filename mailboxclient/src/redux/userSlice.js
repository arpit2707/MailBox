import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: { name: "", email: "", phone: null, token: "" },
  reducers: {
    setUser: (state, action) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.phone = action.payload.phone;
    },
    setToken: (state, action) => {
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      console.log("CAME FOR LOGOUT");
      state.name = "";
      state.email = "";
      state.phone = "";
      localStorage.clear();
      state.token = "";
    },
  },
});

export const { setUser, setToken, setLogout } = userSlice.actions;
export default userSlice.reducer;
