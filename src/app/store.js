import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "../components/quick-search/quickSearchSlice";

export default configureStore({
  reducer: {
    searchItems: searchReducer,
  },
});
