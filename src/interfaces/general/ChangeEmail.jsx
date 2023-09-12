import { useState } from "react";
import messages from "../../constants/messages";
import Joi from "joi";
import Input from "../../components/Input";
import handleSave from "../../functions/handleSave";
import Button from "../../components/Button";
import requestOptions from "../../constants/requestOptions";

function ChangeEmail(props) {
  const [duringAdd, setDuringAdd] = useState(false);

  const [changeEmail, setEmail] = useState({
    password: "",
    newEmail: "",
  });

  const [changeEmailErrors, setEmailErrors] = useState({});
  const changeEmailSchema = {
    password: Joi.string().required().min(8).max(50).messages(messages).label("كلمة السر"),
    newEmail: Joi.string()
      .required()
      .trim()
      .pattern(/[a-zA-Z0-9\_\.]+(@gmail\.com)$/)
      .messages(messages)
      .label("البريد الإلكتروني الجديد"),
  };
  const joiEmail = Joi.object(changeEmailSchema);

  async function send() {
    try {
      const newData = changeEmail;

      const infoRequestOptions = {
        ...requestOptions,
        method: "put",
        body: JSON.stringify({
          ...changeEmail,
        }),
      };

      setDuringAdd(true);
      const response = await fetch(`${import.meta.env.VITE_URL}/account/ch-email`, infoRequestOptions);
      const data = await response.json();
      if (data.success) {
        props.setProfile({ ...props.profile, email: newData.newEmail });
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
              <Input placeholder={""} label={"كلمة السر"} type={"password"} name={"password"} onChange={handleSave} state={changeEmail} setState={setEmail} errors={changeEmailErrors} setErrors={setEmailErrors} schema={changeEmailSchema} />
              <Input placeholder={""} label={"الإيميل الجديد"} type={"email"} name={"newEmail"} onChange={handleSave} state={changeEmail} setState={setEmail} errors={changeEmailErrors} setErrors={setEmailErrors} schema={changeEmailSchema} />
            </div>
          </form>
          <Button action={send} text={"إرسال"} disabled={duringAdd} joiObject={joiEmail} state={changeEmail} setStateErrors={setEmailErrors} toast={props.toast} />
        </div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default ChangeEmail;
