import requestOptions from "../../../../constants/requestOptions";
import jsonParse from "../../../../functions/jsonParse";

export default async function getBlocks(userInformation, setBlocks, toast) {
  try {
    let response = await fetch(`${import.meta.env.VITE_URL}/admin/block/all`, { ...requestOptions, method: "get", headers: { ...requestOptions.headers, authorization: userInformation.token } });
    let data = await response.json();
    if (data.success) {
      let finalBlocks = {};
      await Promise.all(
        data.data.map(async (block) => {
          let restrictions = await jsonParse(block.restrictions);
          let data = { id: block.id, reason: block.reason, duration: block.duration, restrictions: restrictions };
          finalBlocks[block.id] = data;
        })
      );
      setBlocks({ ...finalBlocks });
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
