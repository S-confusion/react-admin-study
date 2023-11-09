import service from "../index";

export const loginApi = (params) => {
  return service.post("/authorizations", params);
};
export const getUserApi = (params) => {
  return service.get("/user/profile", params);
};
