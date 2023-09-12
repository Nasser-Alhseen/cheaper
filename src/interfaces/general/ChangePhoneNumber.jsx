import { useState } from "react";
import messages from "../../constants/messages";
import Joi from "joi";
import Input from "../../components/Input";
import handleSave from "../../functions/handleSave";
import Button from "../../components/Button";
import requestOptions from "../../constants/requestOptions";

function ChangePhoneNumber(props) {
  const [duringAdd, setDuringAdd] = useState(false);

  const [changePhoneNumber, setChangePhoneNumber] = useState({
    password: "",
    phoneNumber: "",
  });

  const [changePhoneNumberErrors, setChangePhoneNumberErrors] = useState({});
  const changePhoneNumberSchema = {
    password: Joi.string().required().min(8).max(50).messages(messages).label("كلمة السر"),
    phoneNumber: Joi.string().required().trim().messages(messages).label("رقم الهاتف الجديد"),
  };
  const joiChangePhoneNumber = Joi.object(changePhoneNumberSchema);

  async function send() {
    try {
      const newData = changePhoneNumberSchema;

      const infoRequestOptions = {
        ...requestOptions,
        method: "put",
        body: JSON.stringify({
          ...changePhoneNumberSchema,
        }),
      };

      setDuringAdd(true);
      const response = await fetch(`${import.meta.env.VITE_URL}/account/ch-phone`, infoRequestOptions);
      const data = await response.json();
      if (data.success) {
        props.setProfile({ ...props.profile, phoneNumber: newData.phoneNumber });
        props.setEdit(false);
        props.toast.success("تم التعديل بنجاح.", {
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
        <div className="form-container">
          <form>
            <div className="row">
              <Input placeholder={""} label={"كلمة السر"} type={"password"} name={"password"} onChange={handleSave} state={changePhoneNumber} setState={setChangePhoneNumber} errors={changePhoneNumberErrors} setErrors={setChangePhoneNumberErrors} schema={changePhoneNumberSchema} />
              <Input placeholder={""} label={"رقم الهاتف الجديد"} type={"text"} name={"phoneNumber"} onChange={handleSave} state={changePhoneNumber} setState={setChangePhoneNumber} errors={changePhoneNumberErrors} setErrors={setChangePhoneNumberErrors} schema={changePhoneNumberSchema} />
            </div>
          </form>
          <Button action={send} text={"إرسال"} disabled={duringAdd} joiObject={joiChangePhoneNumber} state={changePhoneNumber} setStateErrors={setChangePhoneNumberErrors} toast={props.toast} />
        </div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default ChangePhoneNumber;
