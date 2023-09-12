import RoleItem from "./RoleItem";
import AddRoleForm from "./AddRoleForm";
import { useEffect, useRef, useState } from "react";
import requestOptions from "../../../constants/requestOptions";
import { trainingPermission } from "../../../constants/permissions";
import selectOptions from "../../../constants/selectOptions";
import Loading from "../../general/Loading";
import RoleName from "./RoleName";
import "./css/roles.css";
import searchOptions from "../../../constants/searchOptions";
import compare from "../../../functions/compare";
import RoleHeader from "./RoleHeader";

function Roles(props) {
  const cardRef = useRef();
  const [currentEdit, setCurrentEdit] = useState(false);
  const [addNew, setAddNew] = useState(false);
  const [filter, setFilter] = useState(searchOptions.roles);

  useEffect(() => {
    if (!currentEdit) setAddNew(true);
  }, [currentEdit]);

  const [items, setItems] = useState([]);
  useEffect(() => {
    try {
      const populateArray = async () => {
        const newArr = await Promise.all(
          Object.keys(props.roles).map(async (role, roleIndex) => {
            const isTrue = await compare(filter, { name: props.roles[role].name });
            if (isTrue) {
              return <RoleName key={roleIndex} role={props.roles[role]} currentEdit={currentEdit} setCurrentEdit={setCurrentEdit} setAddNew={setAddNew} />;
            }
          })
        );
        setItems([...newArr]);
      };

      populateArray();
    } catch (err) {
      console.log(err);
    }
  }, [filter, props.roles, currentEdit]);

  useEffect(() => {
    setCurrentEdit(false);
  }, [filter]);

  async function deleteRole(id) {
    try {
      const response = await fetch(`${import.meta.env.VITE_URL}/admin/role/delete/${id}`, { ...requestOptions, headers: { ...requestOptions.headers, authorization: props.userInformation.token }, method: "delete" });
      const data = await response.json();
      // const data = { success: true };
      if (data.success) {
        delete props.roles[id];
        if (props.employees != -1) {
          Object.keys(props.employees).map((employee) => {
            if (props.employees[employee].roleId == id) {
              delete props.employees[employee];
            }
          });
          props.setEmployees({ ...props.employees });
        }
        props.setRoles({ ...props.roles });
        setCurrentEdit(props.roles[Object.keys(props.roles)[0]]);
        props.toast.success("تم حذف الدور", {
          position: props.toast.POSITION.TOP_CENTER,
        });
      } else {
        console.log(data.error);
        props.toast.error(data.error, {
          position: props.toast.POSITION.TOP_CENTER,
        });
      }
    } catch (err) {
      props.toast.error("عذرا, حدث خطأ ما", {
        position: props.toast.POSITION.TOP_CENTER,
      });
      console.log(err);
    }
  }

  const [loading, setLoading] = useState(true);
  async function getRoles() {
    try {
      let response = await fetch(`${import.meta.env.VITE_URL}/admin/role/all`, { ...requestOptions, method: "get", headers: { ...requestOptions.headers, authorization: props.userInformation.token } });
      let data = await response.json();
      if (data.success) {
        console.log("hello there", data);
        let finalRoles = {};
        await Promise.all(
          data.data.map(async (role) => {
            let data = { id: role.id, name: role.name, ...role.data };
            finalRoles[role.id] = data;
          })
        );
        props.setRoles({ ...finalRoles });
      } else {
        console.log(data.error);
        props.toast.error("عذرا, حدث خطأ في السيرفر", {
          position: props.toast.POSITION.TOP_CENTER,
        });
      }
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    getRoles();
  }, []);
  useEffect(() => {
    if (props.roles != -1) setLoading(false);
    console.log(props.roles);
  }, [props.roles]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      for (const card of cardRef.current.getElementsByClassName("role-card")) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty("--mouse-x", `${x}px`);
        card.style.setProperty("--mouse-y", `${y}px`);
      }
    };
    if (cardRef.current) {
      cardRef.current.onmousemove = handleMouseMove;
    }
  }, [cardRef.current]);

  try {
    return (
      <>
        {loading ? (
          <div class="profile-main-area">
            <Loading />
          </div>
        ) : (
          <>
            <div class="main-area">
              <button class="btn-show-right-area">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-left">
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              </button>
              <button class="btn-show-left-area">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
              </button>

              <div class="role-right-area">
                <div id="role-cards" ref={cardRef}>
                  <div
                    class="role-card"
                    style={{ "--mouse-x": " 243.38641357421875px", "--mouse-y": "32px" }}
                    onClick={() => {
                      setCurrentEdit(false);
                      setAddNew(true);
                    }}
                  >
                    <div class="role-card-content">
                      <div class="role-card-info-wrapper">
                        <div class="role-card-info">
                          <i class="fa-duotone fa-apartment"></i>
                          <div class="role-card-info-title">
                            <h3>دور جديد</h3>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {items.map((item) => {
                    return item;
                  })}
                </div>
              </div>
            </div>

            <div class="tasks-wrapper">
              <RoleHeader filter={filter} setFilter={setFilter} />
              {currentEdit && <RoleItem toast={props.toast} currentEdit={currentEdit} deleteRole={deleteRole} roles={props.roles} setRoles={props.setRoles} permission={trainingPermission} show={selectOptions.show} userInformation={props.userInformation} />}
              {addNew && <AddRoleForm toast={props.toast} roles={props.roles} setRoles={props.setRoles} permission={trainingPermission} show={selectOptions.show} setCurrentEdit={setCurrentEdit} userInformation={props.userInformation} />}
            </div>
          </>
        )}
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default Roles;
