import { useEffect, useState } from "react";
import requestOptions from "../../../constants/requestOptions";
import { categoryChartData } from "./data/categoryChartData";
import Chart from "react-apexcharts";
import LoadingChart from "../../../components/LoadingChart";

function CategoryChart(props) {
  const [categoryChart, setCategoryChart] = useState(-1);

  async function getCategoryChart() {
    try {
      let response = await fetch(`${import.meta.env.VITE_URL}/admin/category/chartForCategory?categoryId=${props.id}`, { ...requestOptions, method: "get", headers: { ...requestOptions.headers, authorization: props.userInformation.token } });
      let data = await response.json();
      if (data.success) {
        console.log(data);
        let inf = [7, 9, 10];
        setCategoryChart({ ...categoryChartData, series: [{ name: props.name, data: inf }], categories: [] });
      } else {
        console.log(data.error);
        props.toast.error("عذرا, حدث خطأ في السيرفر", {
          position: props.toast.POSITION.TOP_CENTER,
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if (categoryChart == -1) getCategoryChart();
  }, []);

  try {
    return (
      <>
        <div className="chartContainer categories-chart-container">
          {categoryChart == -1 ? (
            <LoadingChart width={"100%"} height={200} />
          ) : (
            <>
              <Chart options={categoryChart.options} series={categoryChart.series} type="area" width={"100%"} height={200} />
            </>
          )}
        </div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default CategoryChart;
