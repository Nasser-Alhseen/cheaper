import { useState } from "react";
import messages from "../../constants/messages";
import Joi from "joi";
import Input from "../../components/Input";
import handleSave from "../../functions/handleSave";
import selectOptions from "../../constants/selectOptions";
import Select from "../../components/Select";
import SelectMultiple from "../../components/SelectMultiple";
import Button from "../../components/Button";
import CheckPasswordInput from "../../components/CheckPasswordInput";
import axios from "axios";
import ImageInput from "../../components/ImageInput";

function UpdateProfile(props) {
  const [duringAdd, setDuringAdd] = useState(false);

  const [user, setUser] = useState({
    name: props.profile.name,
    gender: props.profile.gender,
    category: props.profile.category,
    phoneNumber: props.profile.phoneNumber,
    birthday: props.profile.birthday,
    username: props.profile.username,
    password: props.profile.password,
  });
  useEffect(() => {
    try {
      setUser({
        name: props.profile.name,
        gender: props.profile.gender,
        category: props.profile.category,
        phoneNumber: props.profile.phoneNumber,
        birthday: props.profile.birthday,
        username: props.profile.username,
        password: props.profile.password,
      });
    } catch (err) {
      console.log(err);
    }
  }, [props.profile]);

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
    password: Joi.string().required().min(8).max(50).messages(messages).label("كلمة السر"),
  };
  const joiUser = Joi.object(userSchema);

  const [image, setImage] = useState(false);

  async function updateProfile() {
    try {
      const newData = user;
      const url = `${import.meta.env.VITE_URL}/account/update`;

      setDuringAdd(true);
      let formData = new FormData();
      if (image) formData.append("images", image);
      Object.keys(newData).map((key) => {
        formData.append(key, newData[key]);
      });

      const response = await axios.put(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: props.userInformation.token,
        },
      });
      const data = response.data;

      if (data.success) {
        props.setProfile({ ...props.profile, ...newData, image: data.data });
        props.setEdit(false);
        props.toast.success("تم التعديل بنجاح", {
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
              <Input placeholder={""} label={"الاسم"} type={"text"} name={"name"} onChange={handleSave} state={user} setState={setUser} errors={userErrors} setErrors={setUserErrors} schema={userSchema} />
              <Select label={"الجنس"} placeholder={"اختر الجنس..."} list={selectOptions.gender} name={"gender"} onChange={handleSave} state={user} setState={setUser} errors={userErrors} setErrors={setUserErrors} schema={userSchema} />
              <Input placeholder={""} label={"اسم المستخدم"} type={"text"} name={"username"} onChange={handleSave} state={user} setState={setUser} errors={userErrors} setErrors={setUserErrors} schema={userSchema} />
              <Input placeholder={""} label={"كلمة السر"} type={"password"} name={"password"} onChange={handleSave} state={user} setState={setUser} errors={userErrors} setErrors={setUserErrors} schema={userSchema} />
              <CheckPasswordInput password={user.password} errors={userErrors} setErrors={setUserErrors} />
              <Input placeholder={""} label={"رقم الهاتف"} type={"text"} name={"phoneNumber"} onChange={handleSave} state={user} setState={setUser} errors={userErrors} setErrors={setUserErrors} schema={userSchema} />
              <Input placeholder={""} label={"تاريخ الميلاد"} type={"date"} name={"birthday"} onChange={handleSave} state={user} setState={setUser} errors={userErrors} setErrors={setUserErrors} schema={userSchema} />
              <SelectMultiple label={"أصناف المحلات المفضلة"} placeholder={"اختر الأصناف..."} list={selectOptions.category} name={"category"} onChange={handleSave} state={user} setState={setUser} errors={userErrors} setErrors={setUserErrors} schema={userSchema} />
              <ImageInput setImage={setImage} />
            </div>
          </form>
          <Button action={updateProfile} text={"إرسال"} disabled={duringAdd} joiObject={joiUser} state={user} setStateErrors={setUserErrors} toast={props.toast} />
        </div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default UpdateProfile;
