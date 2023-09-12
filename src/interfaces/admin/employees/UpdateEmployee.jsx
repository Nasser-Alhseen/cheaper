import { useState, useEffect } from "react";
import Joi from "joi";
import Input from "../../../components/Input";
import messages from "../../../constants/messages";
import validateForm from "../../../functions/validateForm";
import handleSave from "../../../functions/handleSave";
import requestOptions from "../../../constants/requestOptions";
import Select from "../../../components/Select";
import selectOptions from "../../../constants/selectOptions";
import SelectFromDB from "../../../components/SelectFromDB";
import CheckPasswordInput from "../../../components/CheckPasswordInput";
import ImageInput from "../../../components/ImageInput";
import axios from "axios";

function UpdateEmployee(props) {
  const [duringAdd, setDuringAdd] = useState(false);
  const [employee, setEmployee] = useState({
    name: props.currentEdit.name,
    gender: props.currentEdit.gender,
    email: props.currentEdit.email,
    phoneNumber: props.currentEdit.phoneNumber,
    username: props.currentEdit.username,
    // password: props.currentEdit.password,
    // nameRole: props.currentEdit.nameRole,
    nameRole: "موظف عادي",
  });

  useEffect(() => {
    setEmployee({
      name: props.currentEdit.name,
      gender: props.currentEdit.gender,
      email: props.currentEdit.email,
      phoneNumber: props.currentEdit.phoneNumber,
      username: props.currentEdit.username,
      // password: props.currentEdit.password,
      // nameRole: props.currentEdit.nameRole,
      nameRole: "موظف عادي",
    });
  }, [props.currentEdit]);
  const [employeeErrors, setEmployeeErrors] = useState({});
  const employeeSchema = {
    name: Joi.string().required().min(2).max(50).trim().messages(messages).label("الاسم"),
    gender: Joi.string().required().messages(messages).label("الجنس"),
    email: Joi.string()
      .trim()
      .required()
      .pattern(/[a-zA-Z0-9]+[a-zA-Z0-9\_\.]*(@gmail\.com)$/)
      .messages(messages)
      .label("البريد الإلكتروني"),
    phoneNumber: Joi.string()
      .trim()
      .required()
      .pattern(/^(09)(\d{8})$/)
      .messages(messages)
      .label("رقم الموبايل"),
    username: Joi.string()
      .trim()
      .pattern(/^[A-Za-z]+[a-zA-Z0-9\_\.]*$/)
      .min(3)
      .max(30)
      .required()
      .messages(messages)
      .label("اسم المستخدم"),
    // password: Joi.string().required().min(8).max(50).messages(messages).label("كلمة المرور"),
    nameRole: Joi.string().required().trim().messages(messages).label("الدور"),
  };
  const joiEmployee = Joi.object(employeeSchema);

  const [image, setImage] = useState(false);

  async function editEmployee(event) {
    try {
      const isValid = await validateForm(event, joiEmployee, employee, setEmployeeErrors);
      if (isValid) {
        const newData = employee;
        const id = props.currentEdit.id;
        const url = `${import.meta.env.VITE_URL}/admin/employee/update/${id}`;

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
        // const data = { success: true };
        if (data.success) {
          console.log(newData);
          props.setEmployees({ ...props.employees, [id]: { ...props.employees[id], ...newData } });
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
            <Input placeholder={""} label={"الاسم"} type={"text"} name={"name"} onChange={handleSave} state={employee} setState={setEmployee} errors={employeeErrors} setErrors={setEmployeeErrors} schema={employeeSchema} />
            <Select label={"الجنس"} placeholder={"اختر الجنس..."} list={selectOptions.gender} name={"gender"} onChange={handleSave} state={employee} setState={setEmployee} errors={employeeErrors} setErrors={setEmployeeErrors} schema={employeeSchema} />
            <Input placeholder={""} label={"البريد الإلكتروني"} type={"text"} name={"email"} onChange={handleSave} state={employee} setState={setEmployee} errors={employeeErrors} setErrors={setEmployeeErrors} schema={employeeSchema} />
            <Input placeholder={""} label={"رقم الموبايل"} type={"text"} name={"phoneNumber"} onChange={handleSave} state={employee} setState={setEmployee} errors={employeeErrors} setErrors={setEmployeeErrors} schema={employeeSchema} />
            <Input placeholder={""} label={"اسم المستخدم"} type={"text"} name={"username"} onChange={handleSave} state={employee} setState={setEmployee} errors={employeeErrors} setErrors={setEmployeeErrors} schema={employeeSchema} />
            {/* <Input placeholder={""} label={"كلمة المرور"} type={"password"} name={"password"} onChange={handleSave} state={employee} setState={setEmployee} errors={employeeErrors} setErrors={setEmployeeErrors} schema={employeeSchema} />
            <CheckPasswordInput password={employee.password} errors={employeeErrors} setErrors={setEmployeeErrors} /> */}
            <SelectFromDB label={"الدور"} placeholder={"اختر الدور..."} list={props.roles} showKey={"name"} valueKey={"name"} name={"nameRole"} onChange={handleSave} state={employee} setState={setEmployee} errors={employeeErrors} setErrors={setEmployeeErrors} schema={employeeSchema} />
            <ImageInput setImage={setImage} />
          </div>

          <div className="button-container">
            <button
              disabled={duringAdd}
              onClick={async (event) => {
                const isValid = await validateForm(event, joiEmployee, employee, setEmployeeErrors);
                isValid && (await editEmployee(event));
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

export default UpdateEmployee;
