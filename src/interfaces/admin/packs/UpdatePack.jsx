import { useState, useEffect } from "react";
import Joi from "joi";
import Input from "../../../components/Input";
import messages from "../../../constants/messages";
import validateForm from "../../../functions/validateForm";
import handleSave from "../../../functions/handleSave";
import requestOptions from "../../../constants/requestOptions";

function UpdatePack(props) {
  const [duringAdd, setDuringAdd] = useState(false);
  const [pack, setPack] = useState({
    name: props.currentEdit.name,
    duration: props.currentEdit.duration,
    price: props.currentEdit.price,
  });

  useEffect(() => {
    setPack({
      name: props.currentEdit.name,
      duration: props.currentEdit.duration,
      price: props.currentEdit.price,
    });
  }, [props.currentEdit]);
  const [packErrors, setPackErrors] = useState({});
  const packSchema = {
    name: Joi.string().required().trim().messages(messages).label("اسم الباقة"),
    duration: Joi.number().required().messages(messages).label("المدة"),
    price: Joi.number().required().messages(messages).label("السعر"),
  };
  const joiPack = Joi.object(packSchema);

  async function editPack(event) {
    try {
      const isValid = await validateForm(event, joiPack, pack, setPackErrors);
      if (isValid) {
        const newData = pack;
        const id = props.currentEdit.id;
        const infoRequestOptions = {
          ...requestOptions,
          method: "put",
          headers: { ...requestOptions.headers, authorization: props.userInformation.token },
          body: JSON.stringify({
            ...pack,
          }),
        };
        setDuringAdd(true);
        const response = await fetch(`${import.meta.env.VITE_URL}/admin/packs/update/${id}`, infoRequestOptions);
        const data = await response.json();
        // const data = { success: true };
        if (data.success) {
          console.log(newData);
          props.setPacks({ ...props.packs, [id]: { ...props.packs[id], ...newData } });
          props.setCurrentEdit(false);
          props.toast.success("تم تعديل الباقة", {
            position: props.toast.POSITION.TOP_CENTER,
          });
        } else {
          console.log(data.error);
          props.toast.error(data.error, {
            position: props.toast.POSITION.TOP_CENTER,
          });
        }
        setDuringAdd(false);
      } else {
        props.toast.info("أدخل جميع المعلومات بشكل صحيح", {
          position: props.toast.POSITION.TOP_CENTER,
        });
      }
    } catch (err) {
      setDuringAdd(false);
      console.log(err);
      props.toast.error("عذرا, حصل خطأ ما", {
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

          <div className="button-container">
            <button
              disabled={duringAdd}
              onClick={async (event) => {
                const isValid = await validateForm(event, joiPack, pack, setPackErrors);
                isValid && (await editPack(event));
              }}
            >
              حفظ
            </button>
          </div>
        </form>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default UpdatePack;
