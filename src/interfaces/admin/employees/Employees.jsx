import { useEffect, useState } from "react";
import Loading from "../../general/Loading";
import requestOptions from "../../../constants/requestOptions";
import EmployeeItem from "./EmployeeItem";
import AddEmployee from "./AddEmployee";
import UpdateEmployee from "./UpdateEmployee";

function Employees(props) {
  const [loading, setLoading] = useState(true);
  const [addNew, setAddNew] = useState(false);
  const [currentEdit, setCurrentEdit] = useState(false);

  const [items, setItems] = useState([]);
  useEffect(() => {
    try {
      const populateArray = async () => {
        const newArr = await Promise.all(
          Object.keys(props.employees).map(async (employeeId, employeeIndex) => {
            const isTrue = true;
            //   const isTrue = await compare(searchOptions["roles"][props.search.field], props.search.operator, props.roles[role][props.search.field], props.search.word);
            if (isTrue) {
              return <EmployeeItem key={employeeIndex} employee={props.employees[employeeId]} deleteEmployee={deleteEmployee} setCurrentEdit={setCurrentEdit} setAddNew={setAddNew} userInformation={props.userInformation} toast={props.toast} navigate={props.navigate} />;
            }
          })
        );
        setItems([...newArr]);
      };

      populateArray();
    } catch (err) {
      console.log(err);
    }
  }, [props.employees, currentEdit]);

  async function getEmployees() {
    try {
      let response = await fetch(`${import.meta.env.VITE_URL}/admin/employee/all`, { ...requestOptions, method: "get", headers: { ...requestOptions.headers, authorization: props.userInformation.token } });
      let data = await response.json();
      if (data.success) {
        let finalEmployees = {};
        console.log(data);
        await Promise.all(
          data.data.map(async (employee) => {
            finalEmployees[employee.id] = employee;
          })
        );
        props.setEmployees({ ...finalEmployees });
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
    getEmployees();
    getRoles();
  }, []);
  useEffect(() => {
    if (props.employees != -1 && props.roles != -1) setLoading(false);
  }, [props.employees, props.roles]);

  async function deleteEmployee(id) {
    try {
      const response = await fetch(`${import.meta.env.VITE_URL}/admin/employee/delete/${id}`, { ...requestOptions, headers: { ...requestOptions.headers, authorization: props.userInformation.token }, method: "delete" });
      const data = await response.json();
      if (data.success) {
        delete props.employees[id];
        props.setEmployees({ ...props.employees });
        props.toast.success("تم حذف الموظف", {
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

  try {
    return (
      <>
        {loading ? (
          <div class="profile-main-area">
            <Loading />
          </div>
        ) : (
          <>
            {items.map((item) => {
              return item;
            })}
            <div
              onClick={() => {
                setCurrentEdit(false);
                setAddNew(true);
              }}
            >
              add employee
            </div>
            {addNew ? (
              <>
                <AddEmployee employees={props.employees} setEmployees={props.setEmployees} roles={props.roles} setAddNew={setAddNew} userInformation={props.userInformation} navigate={props.navigate} toast={props.toast} />
              </>
            ) : null}
            {currentEdit ? (
              <>
                <UpdateEmployee employees={props.employees} setEmployees={props.setEmployees} roles={props.roles} currentEdit={props.employees[currentEdit]} setCurrentEdit={setCurrentEdit} userInformation={props.userInformation} navigate={props.navigate} toast={props.toast} />
              </>
            ) : null}
          </>
        )}
      </>
    );
  } catch (error) {
    console.log(error);
  }
}

export default Employees;
