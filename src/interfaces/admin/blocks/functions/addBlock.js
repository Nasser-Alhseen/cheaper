import requestOptions from "../../../../constants/requestOptions";

export default async function addBlock(block, userInformation, setDuringAdd, blocks, setBlocks, setCurrentEdit, toast) {
  try {
    const newData = { reason: block.reason, duration: block.duration, restrictions: { action: block.action, show: block.show } };
    const infoRequestOptions = {
      ...requestOptions,
      headers: { ...requestOptions.headers, authorization: userInformation.token },
      body: JSON.stringify({
        ...newData,
      }),
    };
    setDuringAdd(true);
    const response = await fetch(`${import.meta.env.VITE_URL}/admin/block/create`, infoRequestOptions);
    const data = await response.json();
    if (data.success) {
      setBlocks({ ...blocks, [data.data]: { id: data.data, ...newData } });
      setCurrentEdit(false);
      toast.success("تمت إضافة الحظر", {
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
    toast.error("عذرا, حدث خطا ما", {
      position: toast.POSITION.TOP_CENTER,
    });
  }
}
