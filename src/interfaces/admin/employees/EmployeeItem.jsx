function EmployeeItem(props) {
  try {
    return (
      <>
        {props.employee.name}
        <br />
        <div
          onClick={() => {
            props.setAddNew(false);
            props.setCurrentEdit(props.employee.id);
          }}
        >
          تعديل
        </div>
        <div
          onClick={() => {
            props.deleteEmployee(props.employee.id);
          }}
        >
          حذف
        </div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default EmployeeItem;
