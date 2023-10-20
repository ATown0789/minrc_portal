import { createSlice } from "@reduxjs/toolkit";

export const applicantSlice = createSlice({
  name: "applicants",
  initialState: [],
  reducers: {
    loadApplicants: (state, action) => {
      return action.payload;
    },
  },
});

export const { loadApplicants } = applicantSlice.actions;

export default applicantSlice.reducer;
