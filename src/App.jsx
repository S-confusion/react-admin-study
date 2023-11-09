import { useRoutes } from "react-router-dom";
import router from "./router";
import { getUser } from "@/store/modules/user";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.userReducer);
  useEffect(() => {
    token && dispatch(getUser());
  }, [token]);

  const outLet = useRoutes(router);
  // 获取用户信息

  return (
    <div className="app">
      {/*  顶级组件 */}
      {outLet}
    </div>
  );
}

export default App;
