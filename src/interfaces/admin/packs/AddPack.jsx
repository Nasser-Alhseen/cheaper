import { useState } from "react";
import messages from "../../../constants/messages";
import Joi from "joi";
import Input from "../../../components/Input";
import handleSave from "../../../functions/handleSave";
import requestOptions from "../../../constants/requestOptions";
import Button from "../../../components/Button";

function AddPack(props) {
  const [duringAdd, setDuringAdd] = useState(false);

  const [pack, setPack] = useState({
    name: "",
    duration: 0,
    price: 0,
  });

  const [packErrors, setPackErrors] = useState({});
  const packSchema = {
    name: Joi.string().required().trim().messages(messages).label("اسم الباقة"),
    duration: Joi.number().required().messages(messages).label("المدة"),
    price: Joi.number().required().messages(messages).label("السعر"),
  };
  const joiPack = Joi.object(packSchema);

  async function sendAdd() {
    try {
      const newData = pack;
      const infoRequestOptions = {
        ...requestOptions,
        headers: { ...requestOptions.headers, authorization: props.userInformation.token },
        body: JSON.stringify({
          ...pack,
        }),
      };
      setDuringAdd(true);
      const response = await fetch(`${import.meta.env.VITE_URL}/admin/packs/create`, infoRequestOptions);
      const data = await response.json();
      if (data.success) {
        props.setPacks({ ...props.packs, [data.data]: { id: data.data, ...newData } });
        props.toast.success("تمت إضافة الباقة بنجاح.", {
          position: props.toast.POSITION.TOP_CENTER,
        });
        props.setAddNew(false);
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
        <form>
          <div className="row">
            <Input placeholder={""} label={"اسم الباقة"} type={"text"} name={"name"} onChange={handleSave} state={pack} setState={setPack} errors={packErrors} setErrors={setPackErrors} schema={packSchema} />
            <Input placeholder={""} label={"المدة"} type={"number"} name={"duration"} onChange={handleSave} state={pack} setState={setPack} errors={packErrors} setErrors={setPackErrors} schema={packSchema} />
            <Input placeholder={""} label={"السعر"} type={"number"} name={"price"} onChange={handleSave} state={pack} setState={setPack} errors={packErrors} setErrors={setPackErrors} schema={packSchema} />
          </div>
        </form>
        <Button action={sendAdd} text={"إرسال"} disabled={duringAdd} joiObject={joiPack} state={pack} setStateErrors={setPackErrors} toast={props.toast} />
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default AddPack;
