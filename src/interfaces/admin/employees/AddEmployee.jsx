import { useEffect, useState } from "react";
import messages from "../../../constants/messages";
import Joi from "joi";
import Input from "../../../components/Input";
import handleSave from "../../../functions/handleSave";
import requestOptions from "../../../constants/requestOptions";
import Button from "../../../components/Button";
import CheckPasswordInput from "../../../components/CheckPasswordInput";
import Select from "../../../components/Select";
import selectOptions from "../../../constants/selectOptions";
import SelectFromDB from "../../../components/SelectFromDB";

function AddEmployee(props) {
  const [duringAdd, setDuringAdd] = useState(false);
  useEffect(() => {
    console.log(props.roles);
  }, []);
  const [employee, setEmployee] = useState({
    name: "",
    gender: "",
    email: "",
    phoneNumber: "",
    username: "",
    password: "",
    roleId: "",
  });

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
    password: Joi.string().required().min(8).max(50).messages(messages).label("كلمة المرور"),
    roleId: Joi.number().required().messages(messages).label("الدور"),
  };
  const joiEmployee = Joi.object(employeeSchema);

  async function sendAdd() {
    try {
      const newData = employee;
      const infoRequestOptions = {
        ...requestOptions,
        headers: { ...requestOptions.headers, authorization: props.userInformation.token },
        body: JSON.stringify({
          ...employee,
        }),
      };
      setDuringAdd(true);
      console.log(employee);
      const response = await fetch(`${import.meta.env.VITE_URL}/admin/employee/create`, infoRequestOptions);
      const data = await response.json();
      if (data.success) {
        props.setEmployees({ ...props.employees, [data.data]: { id: data.data, ...newData } });
        props.toast.success("تمت إضافة الموظف بنجاح.", {
          position: props.toast.POSITION.TOP_CENTER,
        });
        props.setAddNew(false);
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
        <form>
          <div className="row">
            <Input placeholder={""} label={"الاسم"} type={"text"} name={"name"} onChange={handleSave} state={employee} setState={setEmployee} errors={employeeErrors} setErrors={setEmployeeErrors} schema={employeeSchema} />
            <Select label={"الجنس"} placeholder={"اختر الجنس..."} list={selectOptions.gender} name={"gender"} onChange={handleSave} state={employee} setState={setEmployee} errors={employeeErrors} setErrors={setEmployeeErrors} schema={employeeSchema} />
            <Input placeholder={""} label={"البريد الإلكتروني"} type={"text"} name={"email"} onChange={handleSave} state={employee} setState={setEmployee} errors={employeeErrors} setErrors={setEmployeeErrors} schema={employeeSchema} />
            <Input placeholder={""} label={"رقم الموبايل"} type={"text"} name={"phoneNumber"} onChange={handleSave} state={employee} setState={setEmployee} errors={employeeErrors} setErrors={setEmployeeErrors} schema={employeeSchema} />
            <Input placeholder={""} label={"اسم المستخدم"} type={"text"} name={"username"} onChange={handleSave} state={employee} setState={setEmployee} errors={employeeErrors} setErrors={setEmployeeErrors} schema={employeeSchema} />
            <Input placeholder={""} label={"كلمة المرور"} type={"password"} name={"password"} onChange={handleSave} state={employee} setState={setEmployee} errors={employeeErrors} setErrors={setEmployeeErrors} schema={employeeSchema} />
            <CheckPasswordInput password={employee.password} errors={employeeErrors} setErrors={setEmployeeErrors} />
            <SelectFromDB label={"الدور"} placeholder={"اختر الدور..."} list={props.roles} showKey={"name"} valueKey={"id"} name={"roleId"} onChange={handleSave} state={employee} setState={setEmployee} errors={employeeErrors} setErrors={setEmployeeErrors} schema={employeeSchema} />
          </div>
        </form>
        <Button action={sendAdd} text={"إرسال"} disabled={duringAdd} joiObject={joiEmployee} state={employee} setStateErrors={setEmployeeErrors} toast={props.toast} />
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default AddEmployee;
