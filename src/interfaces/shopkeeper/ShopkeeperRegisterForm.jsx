import { useState } from "react";
import messages from "../../constants/messages";
import Joi from "joi";
import Input from "../../components/Input";
import handleSave from "../../functions/handleSave";
import selectOptions from "../../constants/selectOptions";
import Select from "../../components/Select";
import requestOptions from "../../constants/requestOptions";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import CheckPasswordInput from "../../components/CheckPasswordInput";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import getDeviceToken from "../../functions/getDeviceToken";

function ShopkeeperRegisterForm(props) {
  const navigate = useNavigate();
  const [duringAdd, setDuringAdd] = useState(false);

  const [shopkeeper, setShopkeeper] = useState({
    name: "",
    gender: "",
    email: "",
    phoneNumber: "",
    username: "",
    locationText: "",
    password: "",
    nameStore: "",
    longitude: 30.2,
    latitude: 31.3,
    city: "",
    fromHour: "",
    toHour: "",
    category: "",
  });

  const [shopkeeperErrors, setShopkeeperErrors] = useState({});
  const shopkeeperSchema = {
    name: Joi.string().required().min(2).max(50).trim().messages(messages).label("الاسم"),
    gender: Joi.string().required().messages(messages).label("الجنس"),
    email: Joi.string()
      .trim()
      .pattern(/[a-zA-Z0-9\_\.]+(@gmail\.com)$/)
      .allow(null)
      .messages(messages)
      .label("البريد الإلكتروني"),
    phoneNumber: Joi.string()
      .trim()
      .required()
      .pattern(/^(09)(\d{8})$/)
      .messages(messages)
      .label("رقم الهاتف"),
    username: Joi.string()
      .trim()
      .pattern(/[a-zA-Z]+[a-zA-Z0-9\_\.]*$/)
      .min(3)
      .max(30)
      .required()
      .messages(messages)
      .label("اسم المستخدم"),
    locationText: Joi.string().allow(null).messages(messages).label("العنوان"),
    password: Joi.string().required().min(8).max(50).messages(messages).label("كلمة السر"),
    nameStore: Joi.string().required().min(3).max(50).trim().messages(messages).label("اسم المحل"),
    longitude: Joi.number().required().messages(messages).label("الاحداثيات"),
    latitude: Joi.number().required().messages(messages).label("الاحداثيات"),
    city: Joi.string().required().messages(messages).label("المدينة"),
    fromHour: Joi.number().required().min(1).max(12).messages(messages).label("وقت افتتاح المحل"),
    toHour: Joi.number().required().min(1).max(12).messages(messages).label("وقت إغلاق المحل"),
    category: Joi.string().required().trim().messages(messages).label("تصنيف المحل"),
  };
  const joiShopkeeper = Joi.object(shopkeeperSchema);

  async function register() {
    try {
      const newData = shopkeeper;

      let tokenDevice = await getDeviceToken(props.toast);
      if (!tokenDevice) return;
      const infoRequestOptions = {
        ...requestOptions,
        body: JSON.stringify({
          ...shopkeeper,
          tokenDevice,
        }),
      };
      setDuringAdd(true);
      const response = await fetch(`${import.meta.env.VITE_URL}/auth/signup-manger`, infoRequestOptions);
      const data = await response.json();
      if (data.success) {
        props.toast.success("تم إرسال طلب التسجيل, يرجى الانتظار حتى مراجعة الطلب وقبوله.", {
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
              <Input placeholder={""} label={"الاسم"} type={"text"} name={"name"} onChange={handleSave} state={shopkeeper} setState={setShopkeeper} errors={shopkeeperErrors} setErrors={setShopkeeperErrors} schema={shopkeeperSchema} />
              <Select label={"الجنس"} placeholder={"اختر الجنس..."} list={selectOptions.gender} name={"gender"} onChange={handleSave} state={shopkeeper} setState={setShopkeeper} errors={shopkeeperErrors} setErrors={setShopkeeperErrors} schema={shopkeeperSchema} />
              <Input placeholder={""} label={"البريد الإلكتروني"} type={"email"} name={"email"} onChange={handleSave} state={shopkeeper} setState={setShopkeeper} errors={shopkeeperErrors} setErrors={setShopkeeperErrors} schema={shopkeeperSchema} />
              <Input placeholder={""} label={"رقم الهاتف"} type={"text"} name={"phoneNumber"} onChange={handleSave} state={shopkeeper} setState={setShopkeeper} errors={shopkeeperErrors} setErrors={setShopkeeperErrors} schema={shopkeeperSchema} />
              <Input placeholder={""} label={"اسم المستخدم"} type={"text"} name={"username"} onChange={handleSave} state={shopkeeper} setState={setShopkeeper} errors={shopkeeperErrors} setErrors={setShopkeeperErrors} schema={shopkeeperSchema} />
              <Input placeholder={""} label={"العنوان"} type={"text"} name={"locationText"} onChange={handleSave} state={shopkeeper} setState={setShopkeeper} errors={shopkeeperErrors} setErrors={setShopkeeperErrors} schema={shopkeeperSchema} />
              <Input placeholder={""} label={"كلمة السر"} type={"password"} name={"password"} onChange={handleSave} state={shopkeeper} setState={setShopkeeper} errors={shopkeeperErrors} setErrors={setShopkeeperErrors} schema={shopkeeperSchema} />
              <CheckPasswordInput password={shopkeeper.password} errors={shopkeeperErrors} setErrors={setShopkeeperErrors} />
              <Input placeholder={""} label={"اسم المحل"} type={"text"} name={"nameStore"} onChange={handleSave} state={shopkeeper} setState={setShopkeeper} errors={shopkeeperErrors} setErrors={setShopkeeperErrors} schema={shopkeeperSchema} />
              <Select label={"المدينة"} placeholder={"اختر المدينة التي يقع فيها المحل..."} list={selectOptions.city} name={"city"} onChange={handleSave} state={shopkeeper} setState={setShopkeeper} errors={shopkeeperErrors} setErrors={setShopkeeperErrors} schema={shopkeeperSchema} />
              <Select label={"صنف المحل"} placeholder={"اختر تصنيف المحل..."} list={selectOptions.category} name={"category"} onChange={handleSave} state={shopkeeper} setState={setShopkeeper} errors={shopkeeperErrors} setErrors={setShopkeeperErrors} schema={shopkeeperSchema} />
              <Input placeholder={""} label={"وقت افتتاح المحل"} type={"text"} name={"fromHour"} onChange={handleSave} state={shopkeeper} setState={setShopkeeper} errors={shopkeeperErrors} setErrors={setShopkeeperErrors} schema={shopkeeperSchema} />
              <Input placeholder={""} label={"وقت إغلاق المحل"} type={"text"} name={"toHour"} onChange={handleSave} state={shopkeeper} setState={setShopkeeper} errors={shopkeeperErrors} setErrors={setShopkeeperErrors} schema={shopkeeperSchema} />
            </div>
          </form>
          <Button action={register} text={"إرسال"} disabled={duringAdd} joiObject={joiShopkeeper} state={shopkeeper} setStateErrors={setShopkeeperErrors} toast={props.toast} />
        </div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default ShopkeeperRegisterForm;
