import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../redux/userSlice";
import mailSlice from "../redux/mailSlice";

const store = configureStore({ reducer: { user: userSlice, mail: mailSlice } });
export default store;
