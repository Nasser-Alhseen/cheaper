import requestOptions from "../../../../constants/requestOptions";

export default async function deleteBlock(id, userInformation, blocks, setBlocks, setCurrentEdit, toast) {
  try {
    const response = await fetch(`${import.meta.env.VITE_URL}/admin/block/delete/${id}`, { ...requestOptions, headers: { ...requestOptions.headers, authorization: userInformation.token }, method: "delete" });
    const data = await response.json();
    // const data = { success: true };
    if (data.success) {
      delete blocks[id];
      setBlocks({ ...blocks });
      setCurrentEdit(blocks[Object.keys(blocks)[0]]);
      toast.success("تم حذف الحظر", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      console.log(data.error);
      toast.error(data.error, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  } catch (err) {
    console.log(err);
    toast.error("عذرا, حدث خطأ ما", {
      position: toast.POSITION.TOP_CENTER,
    });
  }
}
