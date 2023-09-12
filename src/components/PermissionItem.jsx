import { useEffect } from "react";
import handleSave from "../functions/handleSave";
function PermissionItem(props) {
  useEffect(() => {
    console.log(props.role);
  }, []);
  try {
    return (
      <>
        <div key={props.id} className="task">
          <input
            className="task-item"
            type="checkbox"
            value={props.permission[props.permissionGroup][props.permissionItem]}
            id={"item" + props.permissionGroup + props.permissionItem}
            onChange={async (event) => {
              if (event.target.checked) await handleSave({ target: { name: props.name, value: [...props.role[props.name], event.target.value] } }, props.role, props.setRole, props.roleErrors, props.setRoleErrors, props.roleSchema);
              else {
                props.role[props.name].splice(props.role[props.name].indexOf(event.target.value), 1);
                props.setRole({ ...props.role });
              }
            }}
            checked={props.role[props.name].includes(props.permission[props.permissionGroup][props.permissionItem]) ? true : false}
          />
          <label htmlFor={"item" + props.permissionGroup + props.permissionItem}>
            <span className="label-text">{props.permissionItem}</span>
          </label>
          <span className="tag approved">{props.permissionGroup}</span>
        </div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default PermissionItem;
