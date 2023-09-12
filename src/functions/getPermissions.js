import requestOptions from "../constants/requestOptions";

async function getPermissions(setPermissions, userInformation, toast) {
  try {
    let response = await fetch(`${import.meta.env.VITE_URL}/account/myPermission`, { ...requestOptions, method: "get", headers: { ...requestOptions.headers, authorization: userInformation.token } });
    let data = await response.json();
    if (data.success) {
      setPermissions({ ...data.data });
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

export default getPermissions;
