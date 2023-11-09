import * as echarts from "echarts";
import { useEffect, useRef } from "react";

const LineChart = ({ option }) => {
  const lineChart = useRef(null);
  useEffect(() => {
    let myChart = echarts.init(lineChart.current);
    option && myChart.setOption(option);
    return () => {
      myChart?.current?.dispose();
    };
  }, [option]);
  return (
    <div ref={lineChart} style={{ width: "600px", height: "400px" }}></div>
  );
};

export default LineChart;
