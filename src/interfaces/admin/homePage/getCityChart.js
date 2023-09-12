import requestOptions from "../../../constants/requestOptions";

export default async function getCityChart(userInformation, toast, setHomeCityChart) {
  try {
    let response = await fetch(`${import.meta.env.VITE_URL}/admin/home/cityChart`, { ...requestOptions, method: "get", headers: { ...requestOptions.headers, authorization: userInformation.token } });
    let data = await response.json();
    if (data.success) {
      console.log("hello", data);
      //   await Promise.all(
      //     data.data.map((chartItem, index) => {
      //       console.log("citychart", chartItem);
      //     })
      //   );
      //   setHomeCityChart({ ...data.data });
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
