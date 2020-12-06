import { createSlice } from "@reduxjs/toolkit";

const actionTypes = {
  SEARCH_EMPTY: "SEARCH_EMPTY",
  SEARCH_PENDING: "SEARCH_PENDING",
  SEARCH_SUCCESS: "SEARCH_SUCCESS",
  SEARCH_FAILURE: "SEARCH_FAILURE",
};
const selectSearchItems = (state) => state.searchItems;

export const quickSearchSlice = createSlice({
  name: "searchItems",
  initialState: {
    status: "idle",
    value: [],
    error: null,
  },
  reducers: {
    search: (state, { payload: { type, value, error } }) => {
      switch (type) {
        case actionTypes.SEARCH_EMPTY:
          return { value: [], status: "idle", error: null };
        case actionTypes.SEARCH_PENDING:
          return { ...state, status: "pending", error: null };
        case actionTypes.SEARCH_SUCCESS:
          return { value, status: "success", error: null };
        case actionTypes.SEARCH_FAILURE:
          return { value: [], status: "failure", error };
        default:
          return state;
      }
    },
  },
});
const { search } = quickSearchSlice.actions;

export { actionTypes, selectSearchItems, search };
export default quickSearchSlice.reducer;
