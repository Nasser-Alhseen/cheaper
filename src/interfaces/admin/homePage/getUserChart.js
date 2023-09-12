import requestOptions from "../../../constants/requestOptions";
import { userChartData } from "./data/userChartData";

export default async function getUserChart(userInformation, toast, setHomeUserChart) {
  try {
    let response = await fetch(`${import.meta.env.VITE_URL}/admin/home/userChart`, { ...requestOptions, method: "get", headers: { ...requestOptions.headers, authorization: userInformation.token } });
    let data = await response.json();
    if (data.success) {
      let chartData = [];
      let chartDate = [];
      await Promise.all(
        data.data.map((chartItem, index) => {
          chartData = [...chartData, chartItem.count];
          chartDate = [...chartDate, chartItem.date];
        })
      );
      setHomeUserChart({ ...userChartData, loading: false, value: chartData.length ? chartData[0] : userChartData.value, categories: chartDate, series: [{ name: userChartData.series[0].name, data: chartData }] });
    } else {
      console.log(data.error);
      toast.error("عذرا, حدث خطأ في السيرفر", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  } catch (err) {
    console.log(err);
  }
}
