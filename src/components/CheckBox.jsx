import handleSave from "../functions/handleSave";

function CheckBox(props) {
  try {
    return (
      <>
        <input
          type="checkbox"
          className="task-item"
          value={props.state[props.name]}
          id={props.name}
          onChange={async (event) => {
            await handleSave({ target: { name: props.name, value: props.values[event.target.checked] } }, props.state, props.setState, props.errors, props.setErrors, props.schema);
          }}
          checked={props.values[props.state[props.name]]}
        />
        <label htmlFor={props.name}>
          <span className="label-text">{props.label}</span>
        </label>
        <div className="validating-error">{props.errors[props.name] && <div>{props.errors[props.name]}</div>}</div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default CheckBox;
