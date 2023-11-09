import { createSlice } from "@reduxjs/toolkit";
import service from "@/utils/request";
const store = createSlice({
  name: "user",
  initialState: {
    user: {},
    token: "",
  },
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    setToken(state, action) {
      state.token = action.payload;
    },
  },
});
const { setUser, setToken } = store.actions;

const login = (params) => {
  return async (dispatch) => {
    const res = await service.post("/authorizations", params);
    dispatch(setToken(res.data.token));
  };
};
export { setUser, setToken, login };
export default store.reducer;
