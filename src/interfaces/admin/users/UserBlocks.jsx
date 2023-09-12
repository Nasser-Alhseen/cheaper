import { useEffect, useState } from "react";
import Loading from "../../general/Loading";
import getUserBlocks from "./function/getUserBlocks";
import handleSave from "../../../functions/handleSave";
import requestOptions from "../../../constants/requestOptions";
import messages from "../../../constants/messages";
import Joi from "joi";
import SelectFromDB from "../../../components/SelectFromDB";
import Button from "../../../components/Button";

function UserBlocks(props) {
  const [userBlocks, setUserBlocks] = useState(false);
  const [duringAdd, setDuringAdd] = useState(false);
  useEffect(() => {
    getUserBlocks(props.userInformation, props.currentShowBlocks.id, setUserBlocks, userBlocks, props.toast);
  }, []);

  const [newBlock, setNewBlock] = useState({
    blockId: null,
  });

  const [newBlockErrors, setNewBlockErrors] = useState({});
  const newBlockSchema = {
    blockId: Joi.number().required().messages(messages).label("نوع الحظر"),
  };
  const joiNewBlock = Joi.object(newBlockSchema);

  async function addUserBlock() {
    try {
      const newData = newBlock;
      const userId = props.currentShowBlocks.id;
      const infoRequestOptions = {
        ...requestOptions,
        method: "PUT",
        headers: { ...requestOptions.headers, authorization: props.userInformation.token },
      };
      setDuringAdd(true);
      const response = await fetch(`${import.meta.env.VITE_URL}/admin/users/block?userId=${userId}&blockId=${newData.blockId}`, infoRequestOptions);
      const data = await response.json();
      if (data.success) {
        props.toast.success("تم حظر المستخدم بنجاح.", {
          position: props.toast.POSITION.TOP_CENTER,
        });
      } else {
        console.log(data.error);
        props.toast.error(data.error, {
          position: props.toast.POSITION.TOP_CENTER,
        });
      }
      setDuringAdd(false);
    } catch (err) {
      setDuringAdd(false);
      console.log(err);
      props.toast.error("عذرا حدث خطأ ما", {
        position: props.toast.POSITION.TOP_CENTER,
      });
    }
  }

  try {
    return (
      <>
        {userBlocks ? (
          <>
            <div>
              عدد البلوكات : {userBlocks.count}
              <br />
              الحالة : {userBlocks.checkIfNowBlocked ? "محظور" : "غير محظور"}
              <br />
              <form>
                {console.log(props.blocks)}
                <SelectFromDB label={"حظر المستخدم"} placeholder={"اختر نوع حظر..."} list={props.blocks} showKey={"reason"} valueKey={"id"} name={"blockId"} onChange={handleSave} state={newBlock} setState={setNewBlock} errors={newBlockErrors} setErrors={setNewBlockErrors} schema={newBlockSchema} />
              </form>
              <Button action={addUserBlock} text={"إرسال"} disabled={duringAdd} joiObject={joiNewBlock} state={newBlock} setStateErrors={setNewBlockErrors} toast={props.toast} />
            </div>
          </>
        ) : (
          <Loading />
        )}
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default UserBlocks;
