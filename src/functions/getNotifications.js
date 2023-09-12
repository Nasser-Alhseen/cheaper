import requestOptions from "../constants/requestOptions";

async function getNotifications(setNotifications, notifications, userInformation, toast, pageNumber, setPageNumber) {
  try {
    let response = await fetch(`${import.meta.env.VITE_URL}/account/notification?page=${pageNumber}&size=${4}`, { ...requestOptions, method: "get", headers: { ...requestOptions.headers, authorization: userInformation.token } });
    let data = await response.json();
    if (data.success) {
      setNotifications({ ...notifications, ...data.data });
      setPageNumber(pageNumber + 1);
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

export default getNotifications;
