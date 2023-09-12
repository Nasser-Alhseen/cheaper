import requestOptions from "../../../constants/requestOptions";

export default async function getCount(userInformation, toast, setHomeCount) {
  try {
    let response = await fetch(`${import.meta.env.VITE_URL}/admin/home`, { ...requestOptions, method: "get", headers: { ...requestOptions.headers, authorization: userInformation.token } });
    let data = await response.json();
    if (data.success) {
      console.log("count", data);
      // localStorage.setItem("csrfToken", data.data.csrfToken);
      setHomeCount({ ...data.data });
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
