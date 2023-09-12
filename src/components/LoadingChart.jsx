import Chart from "react-apexcharts";
import { loadingChartData } from "../data/loadingChartData";
import Loading from "../interfaces/general/Loading";
import "../css/loadingChart.css";
function LoadingChart(props) {
  try {
    return (
      <>
        <div className="chart-loading-container">
          <div className="chart-loading-logo">
            <Loading />
          </div>
          <Chart options={loadingChartData.options} series={loadingChartData.series} type="area" width={props.width} height={props.height} />
        </div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default LoadingChart;
