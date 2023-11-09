import { setUser, setToken } from "./reducer";
import service from "@/api";

const login = (params) => async (dispatch) => {
  const res = await service.post("/authorizations", params);
  dispatch(setToken(res.data.token));
};

const getUser = () => async (dispatch) => {
  console.log(dispatch, "dispatch");
  const res = await service.get("/user/profile");
  dispatch(setUser(res.data));
};

export { setUser, setToken, login, getUser };
