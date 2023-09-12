import handleSave from "../functions/handleSave";

function SelectMultiple(props) {
  try {
    return (
      <>
        <div className="column" style={{ position: "relative" }}>
          <h3>{props.label}</h3>
          <select
            className="my-listbox"
            onChange={() => {}}
            onClick={async (event) => {
              if (event.target.value) {
                let newValue = [];
                let isExist = false;
                Promise.all(
                  props.state[props.name].map((item) => {
                    if (item != event.target.value) newValue = [...newValue, item];
                    else isExist = true;
                  })
                );
                if (!isExist) newValue = [...newValue, event.target.value];
                await handleSave({ target: { name: props.name, value: newValue } }, props.state, props.setState, props.errors, props.setErrors, props.schema);
              }
            }}
            value={props.state[props.name]}
            disabled={props.disabled}
            multiple={true}
          >
            <option value={[]}>{props.placeholder}</option>
            {Object.keys(props.list).map((listItem, listIndex) => {
              return (
                <option key={listIndex} value={props.list[listItem].id ? props.list[listItem].id : props.list[listItem].value}>
                  {props.list[listItem].name}
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

export default SelectMultiple;
