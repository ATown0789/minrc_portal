import { configureStore } from "@reduxjs/toolkit";
import jobReducer from "../Redux/Jobs/jobSlice";
import userReducer from "../Redux/User/userSlice";
import loaderReducer from "../Redux/Loader/loaderSlice";
import applicantsReducer from "../Redux/Applicants/applicantSlice";

//Store
export const store = configureStore({
  reducer: {
    jobs: jobReducer,
    user: userReducer,
    loader: loaderReducer,
    applicants: applicantsReducer,
  },
});
