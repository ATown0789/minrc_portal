import { createSlice } from "@reduxjs/toolkit";

export const loaderSlice = createSlice({
  name: "loader",
  initialState: true,
  reducers: {
    setLoader: (state, action) => {
      state = action.payload;
      return state;
    },
  },
});

export const { setLoader } = loaderSlice.actions;

export default loaderSlice.reducer;
