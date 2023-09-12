import requestOptions from "../../../../constants/requestOptions";

export default async function getCategories(userInformation, setCategories, toast) {
  try {
    let response = await fetch(`${import.meta.env.VITE_URL}/admin/category/all`, { ...requestOptions, method: "get", headers: { ...requestOptions.headers, authorization: userInformation.token } });
    let data = await response.json();
    if (data.success) {
      let finalCategories = {};
      await Promise.all(
        data.data.map(async (category) => {
          finalCategories[category.id] = category;
        })
      );
      setCategories({ ...finalCategories });
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
