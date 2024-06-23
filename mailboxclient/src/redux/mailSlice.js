import { createSlice } from "@reduxjs/toolkit";
import userSlice from "./userSlice";

const mailSlice = createSlice({
  name: "mail",
  initialState: { unreadCount: 0, selectedBox: "" },
  reducers: {
    setUnreadCount: (state, action) => {
      state.unreadCount = action.payload.unread;
    },
    setSelectedBox: (state, action) => {
      state.selectedBox = action.payload.selectedBox;
    },
  },
});
export const { setUnreadCount, setSelectedBox } = mailSlice.actions;
export default mailSlice.reducer;
