import { createSlice } from "@reduxjs/toolkit";

const initialState = { loggedIn: false };

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    editUser: (state, { payload }) => {
      return { ...state, ...payload };
    },
    logOutUser: (state) => {
      state = { ...initialState };
      return state;
    },
  },
});

// Action creators are generated for each case reducer function
export const { editUser, logOutUser } = userSlice.actions;

export default userSlice.reducer;
