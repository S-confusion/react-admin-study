import LineChart from "../../components/charts/linechart";
import styles from "./chartsboard.module.scss";
const chartsBoard = () => {
  let option = {
    xAxis: {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: "line",
        smooth: true,
      },
    ],
  };
  return (
    <div className={styles.root}>
      <LineChart option={option} />
    </div>
  );
};
export default chartsBoard;
