import { useState, Fragment, useEffect } from "react";
import * as faw from "react-icons/fa";
import handleSave from "../../../functions/handleSave";

function ChooseIcon(props) {
  const [iconSearch, setIconSearch] = useState("");
  function iconSearchHandle(event) {
    event.preventDefault();
    setIconSearch(event.target.value);
  }
  const [showIcons, setShowIcons] = useState(false);

  function getIcon() {
    const Cur = faw[props.state[props.name]];
    if (Cur) {
      return <Cur />;
    } else {
      return "not found";
    }
  }
  try {
    return (
      <>
        <label
          onClick={() => {
            setShowIcons(!showIcons);
          }}
        >
          {props.label}
        </label>
        {props.state[props.name] ? getIcon() : null}
        <div className="validating-error">{props.errors[props.name] && <div>{props.errors[props.name]}</div>}</div>
        {showIcons ? (
          <>
            <input
              type="text"
              value={iconSearch}
              onChange={(event) => {
                iconSearchHandle(event);
              }}
            />

            <div style={{ display: "flex", width: "100%", flexWrap: "wrap", justifyContent: "space-evenly" }}>
              {Object.keys(faw).map((item, index) => {
                if (item.toLowerCase().includes(iconSearch.toLowerCase()) || iconSearch == "") {
                  const Icon = faw[item];
                  return (
                    <Fragment key={index}>
                      <div
                        onClick={async () => {
                          await handleSave({ target: { name: props.name, value: item } }, props.state, props.setState, props.errors, props.setErrors, props.schema);
                        }}
                        style={{ color: "#081f48", width: "70px", height: "70px", fontSize: "60px", display: "flex", justifyContent: "center", alignItems: "center" }}
                      >
                        <Icon />
                      </div>
                    </Fragment>
                  );
                }
              })}
            </div>
          </>
        ) : null}
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default ChooseIcon;
