import React from "react";
import ReactDOM from "react-dom/client";
import "reset-css";
import "@/assets/styles/global.scss";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
// 持久化存储
import store from "@/store";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
let persistor = persistStore(store);

// render
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>
);
