import { useEffect } from "react";
import handleSave from "../functions/handleSave";
function ShowItem(props) {
  useEffect(() => {
    console.log(props.role, props.name);
  }, []);
  try {
    return (
      <div key={props.id} className="task">
        {console.log(props.role[props.name])}
        <input
          className="task-item"
          type="checkbox"
          value={props.showItem.value}
          id={"item" + props.showItem.value}
          onChange={async (event) => {
            if (event.target.checked) await handleSave({ target: { name: props.name, value: [...props.role[props.name], event.target.value] } }, props.role, props.setRole, props.roleErrors, props.setRoleErrors, props.roleSchema);
            else {
              props.role[props.name].splice(props.role[props.name].indexOf(event.target.value), 1);
              props.setRole({ ...props.role });
            }
          }}
          checked={props.role[props.name].includes(props.showItem.value) ? true : false}
        />
        <label htmlFor={"item" + props.showItem.value}>
          <span className="label-text">{props.showItem.name}</span>
        </label>
      </div>
    );
  } catch (err) {
    console.log(err);
  }
}

export default ShowItem;
