import { useEffect, useState } from "react";
import messages from "../../../constants/messages";
import Joi from "joi";
import Input from "../../../components/Input";
import handleSave from "../../../functions/handleSave";
import selectOptions from "../../../constants/selectOptions";
import Select from "../../../components/Select";
import SelectMultiple from "../../../components/SelectMultiple";
import Button from "../../../components/Button";
import CheckPasswordInput from "../../../components/CheckPasswordInput";
import ImageInput from "../../../components/ImageInput";
import axios from "axios";

function UpdateUser(props) {
  const [duringAdd, setDuringAdd] = useState(false);

  const [user, setUser] = useState({
    name: props.currentEdit.name,
    gender: props.currentEdit.gender,
    birthday: props.currentEdit.birthday,
    username: props.currentEdit.username,
    password: "",
  });

  useEffect(() => {
    setUser({
      name: props.currentEdit.name,
      gender: props.currentEdit.gender,
      birthday: props.currentEdit.birthday,
      username: props.currentEdit.username,
      password: "",
    });
  }, [props.currentEdit]);

  const [userErrors, setUserErrors] = useState({});
  const userSchema = {
    name: Joi.string().required().min(2).max(50).trim().messages(messages).label("الاسم"),
    gender: Joi.string().required().messages(messages).label("الجنس"),
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

  const [image, setImage] = useState(false);

  async function editUser(event) {
    try {
      const newData = user;
      const id = props.currentEdit.id;
      const url = `${import.meta.env.VITE_URL}/admin/users/update/${id}`;

      setDuringAdd(true);
      let formData = new FormData();
      if (image) formData.append("avatar", image);
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
      // const data = { success: true };
      if (data.success) {
        console.log(newData);
        props.setUsers({ ...props.users, [id]: { ...props.users[id], ...newData } });
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
            <Input placeholder={""} label={"الاسم"} type={"text"} name={"name"} onChange={handleSave} state={user} setState={setUser} errors={userErrors} setErrors={setUserErrors} schema={userSchema} />
            <Select label={"الجنس"} placeholder={"اختر الجنس..."} list={selectOptions.gender} name={"gender"} onChange={handleSave} state={user} setState={setUser} errors={userErrors} setErrors={setUserErrors} schema={userSchema} />
            <Input placeholder={""} label={"اسم المستخدم"} type={"text"} name={"username"} onChange={handleSave} state={user} setState={setUser} errors={userErrors} setErrors={setUserErrors} schema={userSchema} />
            <Input placeholder={""} label={"كلمة المرور"} type={"password"} name={"password"} onChange={handleSave} state={user} setState={setUser} errors={userErrors} setErrors={setUserErrors} schema={userSchema} />
            {/* <CheckPasswordInput password={user.password} errors={userErrors} setErrors={setUserErrors} /> */}
            <Input placeholder={""} label={"تاريخ الميلاد"} type={"date"} name={"birthday"} onChange={handleSave} state={user} setState={setUser} errors={userErrors} setErrors={setUserErrors} schema={userSchema} />
            <ImageInput setImage={setImage} />
          </div>
        </form>
        <Button action={editUser} text={"إرسال"} disabled={duringAdd} joiObject={joiUser} state={user} setStateErrors={setUserErrors} toast={props.toast} />
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default UpdateUser;
