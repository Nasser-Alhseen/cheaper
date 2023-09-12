import requestOptions from "../../../../constants/requestOptions";

export default async function editBlock(block, currentEdit, userInformation, setDuringAdd, blocks, setBlocks, toast) {
  try {
    const newData = { reason: block.reason, duration: block.duration, restrictions: { action: block.action, show: block.show } };
    const id = currentEdit.id;
    const infoRequestOptions = {
      ...requestOptions,
      headers: { ...requestOptions.headers, authorization: userInformation.token },
      method: "put",
      body: JSON.stringify({
        ...newData,
      }),
    };
    setDuringAdd(true);
    const response = await fetch(`${import.meta.env.VITE_URL}/admin/block/update/${id}`, infoRequestOptions);
    const data = await response.json();
    if (data.success) {
      setBlocks({ ...blocks, [id]: { id: id, ...newData } });
      toast.success("تم تعديل الحظر ", {
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
