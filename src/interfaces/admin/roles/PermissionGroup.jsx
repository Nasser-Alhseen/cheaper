import { useEffect, useState } from "react";
import PermissionItem from "../../../components/PermissionItem";

function PermissionGroup(props) {
  const [opened, setOpened] = useState(false);
  const [elements, setElements] = useState([]);

  useEffect(() => {
    try {
      setElements(
        Object.keys(props.permission[props.permissionGroup]).map((permissionItem, permissionIndex) => {
          props.setIndex(props.index + 1);
          return (
            <PermissionItem
              key={permissionIndex}
              id={props.id ? props.id : props.currentEdit.id}
              index={props.index}
              permissionGroupIndex={props.permissionGroupIndex}
              permissionItem={permissionItem}
              permissionGroup={props.permissionGroup}
              permission={props.permission}
              role={props.role}
              setRole={props.setRole}
              roleErrors={props.roleErrors}
              setRoleErrors={props.setRoleErrors}
              roleSchema={props.roleSchema}
              name={props.name}
            />
          );
        })
      );
    } catch (err) {
      console.log(err);
    }
  }, [props.role]);

  try {
    return (
      <>
        <div class="panel panel-default">
          <div class="panel-heading" role="tab" id="headingOne" onClick={() => setOpened(!opened)}>
            <h4 class="panel-title">
              <a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded={opened ? "true" : "false"} aria-controls="collapseOne">
                {props.permissionGroup}
              </a>
            </h4>
          </div>

          {opened ? elements : null}
        </div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default PermissionGroup;
