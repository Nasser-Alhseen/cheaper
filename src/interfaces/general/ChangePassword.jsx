import { useState } from "react";
import messages from "../../constants/messages";
import Joi from "joi";
import Input from "../../components/Input";
import handleSave from "../../functions/handleSave";
import Button from "../../components/Button";
import requestOptions from "../../constants/requestOptions";

function ChangePassword(props) {
  const [duringAdd, setDuringAdd] = useState(false);

  const [changePassword, setChangePassword] = useState({
    password: "",
    newPassword: "",
  });

  const [changePasswordErrors, setChangePasswordErrors] = useState({});
  const changePasswordSchema = {
    password: Joi.string().required().min(8).max(50).messages(messages).label("كلمة السر"),
    newPassword: Joi.string().required().min(8).max(50).messages(messages).label("كلمة السر الجديدة"),
  };
  const joiChangePassword = Joi.object(changePasswordSchema);

  async function send() {
    try {
      const newData = changePassword;

      const infoRequestOptions = {
        ...requestOptions,
        method: "put",
        body: JSON.stringify({
          ...changePassword,
        }),
      };

      setDuringAdd(true);
      const response = await fetch(`${import.meta.env.VITE_URL}/account/ch-pass`, infoRequestOptions);
      const data = await response.json();
      if (data.success) {
        props.setProfile({ ...props.profile, password: newData.newPassword });
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
              <Input placeholder={""} label={"كلمة السر"} type={"password"} name={"password"} onChange={handleSave} state={changePassword} setState={setChangePassword} errors={changePasswordErrors} setErrors={setChangePasswordErrors} schema={changePasswordSchema} />
              <Input placeholder={""} label={"كلمة السر الجديدة"} type={"password"} name={"newPassword"} onChange={handleSave} state={changePassword} setState={setChangePassword} errors={changePasswordErrors} setErrors={setChangePasswordErrors} schema={changePasswordSchema} />
            </div>
          </form>
          <Button action={send} text={"إرسال"} disabled={duringAdd} joiObject={joiChangePassword} state={changePassword} setStateErrors={setChangePasswordErrors} toast={props.toast} />
        </div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default ChangePassword;
