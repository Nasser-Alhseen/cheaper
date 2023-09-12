import requestOptions from "../../../../constants/requestOptions";

export default async function addCategory(category, userInformation, setDuringAdd, setAddNew, categories, setCategories, toast) {
  try {
    const newData = category;
    const infoRequestOptions = {
      ...requestOptions,
      headers: { ...requestOptions.headers, authorization: userInformation.token },
      body: JSON.stringify({
        ...category,
      }),
    };
    setDuringAdd(true);
    const response = await fetch(`${import.meta.env.VITE_URL}/admin/category/create`, infoRequestOptions);
    const data = await response.json();
    if (data.success) {
      setCategories({ ...categories, [data.data]: { id: data.data, ...newData } });
      toast.success("تمت إضافة التصنيف بنجاح.", {
        position: toast.POSITION.TOP_CENTER,
      });
      setAddNew(false);
    } else {
      console.log(data.error);
      toast.error(data.error, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
    setDuringAdd(false);
  } catch (err) {
    setDuringAdd(false);
    console.log(err);
    toast.error("عذرا حدث خطأ ما", {
      position: toast.POSITION.TOP_CENTER,
    });
  }
}
