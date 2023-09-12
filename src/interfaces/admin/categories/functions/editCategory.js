import requestOptions from "../../../../constants/requestOptions";

export default async function editCategory(category, currentEdit, userInformation, categories, setDuringAdd, setCurrentEdit, setCategories, toast) {
  try {
    const newData = category;
    const id = currentEdit.id;
    const infoRequestOptions = {
      ...requestOptions,
      method: "put",
      headers: { ...requestOptions.headers, authorization: userInformation.token },
      body: JSON.stringify({
        ...category,
      }),
    };
    setDuringAdd(true);
    const response = await fetch(`${import.meta.env.VITE_URL}/admin/category/update/${id}`, infoRequestOptions);
    const data = await response.json();
    // const data = { success: true };
    if (data.success) {
      setCategories({ ...categories, [id]: { ...categories[id], ...newData } });
      setCurrentEdit(false);
      toast.success("تم تعديل الصنف", {
        position: toast.POSITION.TOP_CENTER,
      });
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
    toast.error("عذرا, حصل خطأ ما", {
      position: toast.POSITION.TOP_CENTER,
    });
  }
}
