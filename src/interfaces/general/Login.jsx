import { useState } from "react";
import messages from "../../constants/messages";
import Joi from "joi";
import Input from "../../components/Input";
import handleSave from "../../functions/handleSave";
import requestOptions from "../../constants/requestOptions";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import getDeviceToken from "../../functions/getDeviceToken";

function Login(props) {
  const navigate = useNavigate();
  const [duringAdd, setDuringAdd] = useState(false);

  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const [userErrors, setUserErrors] = useState({});
  const userSchema = {
    username: Joi.string()
      .trim()
      .pattern(/[a-zA-Z]+[a-zA-Z0-9\_\.]*$/)
      .min(3)
      .max(30)
      .required()
      .messages({ ...messages, "string.pattern.base": "{{#label}} must contain just numbers and letters" })
      .label("اسم المستخدم"),
    password: Joi.string().required().min(8).max(50).messages(messages).label("كلمة السر"),
  };
  const joiUser = Joi.object(userSchema);

  async function login() {
    try {
      const newData = user;
      let tokenDevice = await getDeviceToken(props.toast);
      if (!tokenDevice) return;
      const infoRequestOptions = {
        ...requestOptions,
        body: JSON.stringify({
          ...user,
          tokenDevice,
        }),
      };
      setDuringAdd(true);
      const response = await fetch(`${import.meta.env.VITE_URL}/auth/login`, infoRequestOptions);
      const data = await response.json();
      if (data.success) {
        localStorage.setItem("userInformation", JSON.stringify({ ...data.data, userType: "admin" }));
        props.toast.success("أهلا وسهلا!", {
          position: props.toast.POSITION.TOP_CENTER,
        });
        navigate("/home");
      } else {
        console.log(data.error);
        props.toast.error(data.error, {
          position: props.toast.POSITION.TOP_CENTER,
        });
      }
      setDuringAdd(false);
    } catch (err) {
      console.log(err);
      props.toast.error("حدث خطأ ما", {
        position: props.toast.POSITION.TOP_CENTER,
      });
      setDuringAdd(false);
    }
  }

  try {
    return (
      <>
        <div className="form-container">
          <h1>{"Login Now"}</h1>

          <form>
            <div className="row">
              <Input placeholder={""} label={"اسم المستخدم"} type={"text"} name={"username"} onChange={handleSave} state={user} setState={setUser} errors={userErrors} setErrors={setUserErrors} schema={userSchema} />
              <Input placeholder={""} label={"كلمة المرور"} type={"password"} name={"password"} onChange={handleSave} state={user} setState={setUser} errors={userErrors} setErrors={setUserErrors} schema={userSchema} />
            </div>
          </form>
          <div className="new-account" onClick={() => navigate("/register")}>
            لا تمتلك حسابا؟ قم بالتسجيل من هنا
          </div>
          <Button action={login} text={"تسجيل دخول"} disabled={duringAdd} joiObject={joiUser} state={user} setStateErrors={setUserErrors} toast={props.toast} />
        </div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default Login;
