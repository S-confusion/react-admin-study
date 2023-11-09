import { createSlice } from "@reduxjs/toolkit";
import service from "@/utils/request";

const userSlice = createSlice({
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
      localStorage.setItem("react_vite-js_token", action.payload);
    },
  },
});
const { setUser, setToken } = userSlice.actions;

const login = (params) => {
  return async (dispatch) => {
    const res = await service.post("/authorizations", params);
    dispatch(setToken(res.data.token));
  };
};

const getUser = () => {
  return async (dispatch) => {
    const res = await service.get("/user/profile");
    dispatch(setUser(res.data));
  };
};

export { setUser, setToken, login, getUser };

export default userSlice.reducer;
