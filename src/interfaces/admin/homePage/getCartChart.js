import requestOptions from "../../../constants/requestOptions";

export default async function getCartChart(userInformation, toast, setHomeCartChart) {
  try {
    let response = await fetch(`${import.meta.env.VITE_URL}/admin/home/cartChart`, { ...requestOptions, method: "get", headers: { ...requestOptions.headers, authorization: userInformation.token } });
    let data = await response.json();
    if (data.success) {
      console.log(data);
      setHomeCartChart({ ...data.data });
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
