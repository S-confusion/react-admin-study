import { useRoutes } from "react-router-dom";
import router from "./router";

function App() {
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
