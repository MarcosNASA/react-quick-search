import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./quickSearchSlice";

function createStore() {
  return configureStore({
    reducer: {
      searchItems: searchReducer,
    },
  });
}

export default createStore;
