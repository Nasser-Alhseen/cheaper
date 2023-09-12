import handleSave from "../functions/handleSave";

function SelectFromDB(props) {
  try {
    return (
      <>
        <div className="column" style={{ position: "relative" }}>
          <h3>{props.label}</h3>
          <select
            className="my-listbox"
            onChange={async (event) => {
              await handleSave({ target: { name: props.name, value: event.target.value } }, props.state, props.setState, props.errors, props.setErrors, props.schema);
            }}
            value={props.state[props.name]}
            disabled={props.disabled}
          >
            <option value="">{props.placeholder}</option>
            {Object.keys(props.list).map((listItem, listIndex) => {
              return (
                <option key={listIndex} value={props.list[listItem][props.valueKey]}>
                  {props.list[listItem][props.showKey]}
                </option>
              );
            })}
          </select>
          {props.addNew ? (
            <span
              onClick={() => {
                props.addNew(true);
              }}
              className="add-new-in-form"
            >
              Add New +
            </span>
          ) : null}
          <div className="validating-error">{props.errors[props.name] && <div>{props.errors[props.name]}</div>}</div>
        </div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default SelectFromDB;
