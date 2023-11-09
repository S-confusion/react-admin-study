import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import thunk from "redux-thunk";

// 创建的自定义reducer
import userReducer from "./modules/user";

// combineReducers合并reducer
const reducers = combineReducers({
  userReducer,
});

const persistConfig = {
  key: "react_vite_js",
  storage,
  // 黑名单 不缓存的
  blacklist: [],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});

export default store;
