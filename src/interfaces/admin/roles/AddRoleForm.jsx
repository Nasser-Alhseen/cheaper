import { useState } from "react";
import Joi from "joi";
import validateForm from "../../../functions/validateForm";
import handleSave from "../../../functions/handleSave";
import requestOptions from "../../../constants/requestOptions";
import messages from "../../../constants/messages";
import ShowItem from "../../../components/ShowItem";
import Input from "../../../components/Input";
import selectOptions from "../../../constants/selectOptions";
import PermissionGroup from "./PermissionGroup";

function AddRoleForm(props) {
  const [index, setIndex] = useState(1);
  const [duringAdd, setDuringAdd] = useState(false);

  const [role, setRole] = useState({
    name: "",
    show: [],
    action: [],
  });

  const [roleErrors, setRoleErrors] = useState({});
  const roleSchema = {
    name: Joi.string().required().trim().messages(messages).label("اسم الدور"),
    show: Joi.array().items(Joi.string()).required().min(1).messages(messages).label("صلاحيات القراءة"),
    action: Joi.array().items(Joi.string()).required().min(1).messages(messages).label("صلاحيات التعديل"),
  };
  const joiRole = Joi.object(roleSchema);

  async function addRole(event) {
    try {
      const newData = role;
      const infoRequestOptions = {
        ...requestOptions,
        headers: { ...requestOptions.headers, authorization: props.userInformation.token },
        body: JSON.stringify({
          ...role,
        }),
      };
      setDuringAdd(true);
      const response = await fetch(`${import.meta.env.VITE_URL}/admin/role/create`, infoRequestOptions);
      const data = await response.json();
      if (data.success) {
        props.setRoles({ ...props.roles, [data.data]: { id: data.data, ...newData } });
        props.setCurrentEdit(false);
        props.toast.success("تمت إضافة الدور", {
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
      props.toast.error("عذرا, حدث خطأ ما", {
        position: props.toast.POSITION.TOP_CENTER,
      });
    }
  }

  try {
    return (
      <>
        <form>
          <div className="row">
            <Input placeholder={"اسم الدور الجديد"} label={"اسم الدور"} type={"text"} name={"name"} onChange={handleSave} state={role} setState={setRole} errors={roleErrors} setErrors={setRoleErrors} schema={roleSchema} />
          </div>
        </form>

        <div className="header upcoming">صلاحيات التعديل</div>
        {Object.keys(props.permission).map((permissionGroup, permissionGroupIndex) => {
          return <PermissionGroup key={permissionGroupIndex} id={-1} index={index} currentEdit={props.currentEdit} setIndex={setIndex} permission={props.permission} permissionGroup={permissionGroup} permissionGroupIndex={permissionGroupIndex} role={role} setRole={setRole} roleErrors={roleErrors} setRoleErrors={setRoleErrors} roleSchema={roleSchema} name={"action"} />;
        })}
        {roleErrors["action"] && <div className="validating-error">{roleErrors["action"]}</div>}

        <div className="header upcoming">صلاحيات القراءة</div>
        {props.show.map((showItem, showIndex) => {
          return <ShowItem key={showIndex} id={-1} index={showIndex} showItem={showItem} role={role} setRole={setRole} roleErrors={roleErrors} setRoleErrors={setRoleErrors} roleSchema={roleSchema} name={"show"} />;
        })}
        {roleErrors["show"] && <div className="validating-error">{roleErrors["show"]}</div>}

        <form className="role-footer">
          <div className="button-container">
            <button
              className="action-button filter jsFilter"
              disabled={duringAdd}
              onClick={async (event) => {
                const isValid = await validateForm(event, joiRole, role, setRoleErrors);
                if (isValid) await addRole(event);
                else {
                  props.toast.info("أدخل جميع المعلومات بشكل صحيح", {
                    position: props.toast.POSITION.TOP_CENTER,
                  });
                }
              }}
            >
              إضافة
            </button>
          </div>
        </form>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default AddRoleForm;
