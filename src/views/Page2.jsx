import { useReducer, useEffect } from "react";
function init(initialValue) {
  // 尝试从localStorage中读取值
  const savedCount = localStorage.getItem("count");

  // 如果有值并且可以被解析为数字，则返回它，否则返回initialValue
  return { count: savedCount ? Number(savedCount) : initialValue };
}

function counterReducer(state, action) {
  switch (action.type) {
    case "INCREMENT":
      return { count: state.count + 1 };
    case "DECREMENT":
      return { count: state.count - 1 };
    default:
      return state;
  }
}

export default function Counter() {
  const [state, dispatch] = useReducer(counterReducer, 9, init);

  // 使用useEffect来监听状态的变化，并将其保存到localStorage
  useEffect(() => {
    localStorage.setItem("count", JSON.stringify(state.count));
  }, [state.count]);

  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({ type: "INCREMENT" })}>+1</button>
      <button onClick={() => dispatch({ type: "DECREMENT" })}>-1</button>
    </>
  );
}
