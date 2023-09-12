import requestOptions from "../../../constants/requestOptions";

export default async function getStoreChart(userInformation, toast, setHomeStoreChart) {
  try {
    let response = await fetch(`${import.meta.env.VITE_URL}/admin/home/storeChart`, { ...requestOptions, method: "get", headers: { ...requestOptions.headers, authorization: userInformation.token } });
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
      setHomeStoreChart({ ...data.data });
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
