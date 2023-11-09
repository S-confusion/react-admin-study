import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import reduxThunk from "redux-thunk";

// 创建的自定义reducer
import userReducer from "./modules/user";

// combineReducers合并reducer
const reducer = combineReducers({
  userReducer,
});

const persistConfig = {
  key: "react_vite_js",
  storage,
  // 黑名单 不缓存的
  blacklist: [],
};

const persistedReducer = persistReducer(persistConfig, reducer);

// 创建 store
export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [reduxThunk],
});
export const persistor = persistStore(store);

export default { store, persistor };
