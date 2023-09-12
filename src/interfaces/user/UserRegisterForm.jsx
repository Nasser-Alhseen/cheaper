import { useState } from "react";
import messages from "../../constants/messages";
import Joi from "joi";
import Input from "../../components/Input";
import handleSave from "../../functions/handleSave";
import selectOptions from "../../constants/selectOptions";
import Select from "../../components/Select";
import SelectMultiple from "../../components/SelectMultiple";
import requestOptions from "../../constants/requestOptions";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import CheckPasswordInput from "../../components/CheckPasswordInput";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import getDeviceToken from "../../functions/getDeviceToken";

function UserRegisterForm(props) {
  const navigate = useNavigate();
  const [duringAdd, setDuringAdd] = useState(false);

  const [user, setUser] = useState({
    name: "",
    gender: "",
    category: [],
    phoneNumber: "",
    birthday: "",
    username: "",
    password: "",
  });

  const [userErrors, setUserErrors] = useState({});
  const userSchema = {
    name: Joi.string().required().min(2).max(50).trim().messages(messages).label("الاسم"),
    gender: Joi.string().required().messages(messages).label("الجنس"),
    category: Joi.array().items(Joi.string().trim().min(1).max(50)).min(3).required().messages(messages).label("أصناف المحلات المفضلة"),
    phoneNumber: Joi.string()
      .trim()
      .required()
      .pattern(/^(09)(\d{8})$/)
      .messages(messages)
      .label("رقم الهاتف"),
    birthday: Joi.date().required().messages(messages).label("تاريخ الميلاد"),
    username: Joi.string()
      .trim()
      .pattern(/[a-zA-Z]+[a-zA-Z0-9\_\.]*$/)
      .min(3)
      .max(30)
      .required()
      .messages(messages)
      .label("اسم المستخدم"),
    password: Joi.string().required().min(8).max(50).messages(messages).label("كلمة المرور"),
  };
  const joiUser = Joi.object(userSchema);

  async function register() {
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
      const response = await fetch(`${import.meta.env.VITE_URL}/auth/signup`, infoRequestOptions);
      const data = await response.json();
      if (data.success) {
        localStorage.setItem("userInfromation", JSON.stringify({ ...data.data, userType: "user" }));
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
          <span
            onClick={() => {
              props.setStepNumber(0);
            }}
            className="back"
          >
            <MdOutlineArrowForwardIos />
          </span>
          <h1>{"Create un Account With Us"}</h1>

          <form>
            <div className="row">
              <Input placeholder={""} label={"الاسم"} type={"text"} name={"name"} onChange={handleSave} state={user} setState={setUser} errors={userErrors} setErrors={setUserErrors} schema={userSchema} />
              <Select label={"الجنس"} placeholder={"اختر الجنس..."} list={selectOptions.gender} name={"gender"} onChange={handleSave} state={user} setState={setUser} errors={userErrors} setErrors={setUserErrors} schema={userSchema} />
              <Input placeholder={""} label={"اسم المستخدم"} type={"text"} name={"username"} onChange={handleSave} state={user} setState={setUser} errors={userErrors} setErrors={setUserErrors} schema={userSchema} />
              <Input placeholder={""} label={"كلمة المرور"} type={"password"} name={"password"} onChange={handleSave} state={user} setState={setUser} errors={userErrors} setErrors={setUserErrors} schema={userSchema} />
              <CheckPasswordInput password={user.password} errors={userErrors} setErrors={setUserErrors} />
              <Input placeholder={""} label={"رقم الهاتف"} type={"text"} name={"phoneNumber"} onChange={handleSave} state={user} setState={setUser} errors={userErrors} setErrors={setUserErrors} schema={userSchema} />
              <Input placeholder={""} label={"تاريخ الميلاد"} type={"date"} name={"birthday"} onChange={handleSave} state={user} setState={setUser} errors={userErrors} setErrors={setUserErrors} schema={userSchema} />
              <SelectMultiple label={"أصناف المحلات المفضلة"} placeholder={"اختر الأصناف..."} list={selectOptions.category} name={"category"} onChange={handleSave} state={user} setState={setUser} errors={userErrors} setErrors={setUserErrors} schema={userSchema} />
            </div>
          </form>
          <Button action={register} text={"إرسال"} disabled={duringAdd} joiObject={joiUser} state={user} setStateErrors={setUserErrors} toast={props.toast} />
        </div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default UserRegisterForm;
