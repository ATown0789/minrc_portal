import { createSlice } from "@reduxjs/toolkit";

export const jobSlice = createSlice({
  name: "jobs",
  initialState: [],
  reducers: {
    loadJobs: (state, action) => {
      return action.payload;
    },
    addJob: (state, action) => {
      action.payload = { ...action.payload };

      state = [...state, action.payload];
      return state;
    },

    editJob: (state, { payload }) => {
      const findUpdateIndex = (job) => job.id === payload.id;
      const updateIndex = state.findIndex(findUpdateIndex);

      state[updateIndex] = { ...payload };
      return state;
    },

    removeJob: (state, action) => {
      const findDelIndex = (job) => job.id === action.payload;
      const delIndex = state.findIndex(findDelIndex);

      state.splice(delIndex, 1);
    },
  },
});

export const { loadJobs, addJob, removeJob, editJob } = jobSlice.actions;

export default jobSlice.reducer;
