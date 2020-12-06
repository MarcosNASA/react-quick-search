import { createSlice } from "@reduxjs/toolkit";

const actionTypes = {
  SEARCH_EMPTY: "SEARCH_EMPTY",
  SEARCH_PENDING: "SEARCH_PENDING",
  SEARCH_RESOLVED: "SEARCH_RESOLVED",
  SEARCH_REJECTED: "SEARCH_REJECTED",
};
const selectSearchItems = (state) => state.searchItems;

export const quickSearchSlice = createSlice({
  name: "searchItems",
  initialState: {
    status: "idle",
    data: [],
    error: null,
  },
  reducers: {
    search: (state, { payload: { type, data, error } }) => {
      switch (type) {
        case actionTypes.SEARCH_EMPTY:
          return { data: [], status: "idle", error: null };
        case actionTypes.SEARCH_PENDING:
          return { ...state, status: "pending", error: null };
        case actionTypes.SEARCH_RESOLVED:
          return { data, status: "resolved", error: null };
        case actionTypes.SEARCH_REJECTED:
          return { data: [], status: "rejected", error };
        default:
          return state;
      }
    },
  },
});
const { search } = quickSearchSlice.actions;

export { actionTypes, selectSearchItems, search };
export default quickSearchSlice.reducer;
