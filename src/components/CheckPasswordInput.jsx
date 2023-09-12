import { useEffect, useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";

function CheckPasswordInput(props) {
  const [checkPassword, setCheckPassword] = useState("");
  const [isText, setIsText] = useState(false);
  useEffect(() => {
    try {
      props.password == checkPassword ? props.setErrors({ ...props.errors, checkPassword: "" }) : props.setErrors({ ...props.errors, checkPassword: "كلمة المرور غير متطابقة" });
    } catch (err) {
      console.log(err);
    }
  }, [props.password]);

  try {
    return (
      <>
        <div className="column" style={{ position: "relative" }}>
          <h3>{"تأكيد كلمة المرور"}</h3>
          <input
            type={isText ? "text" : "password"}
            name={"checkPassword"}
            id={"checkPassword"}
            value={checkPassword}
            onChange={async (event) => {
              setCheckPassword(event.target.value);
              event.target.value == props.password ? props.setErrors({ ...props.errors, checkPassword: "" }) : props.setErrors({ ...props.errors, checkPassword: "كلمة المرور غير متطابقة" });
            }}
            spellCheck="false"
            dir="rtl"
            required
          />
          <div className="validating-error">{props.errors["checkPassword"] && <div>{props.errors["checkPassword"]}</div>}</div>
          <span
            style={{ position: "absolute", left: "15px", top: "42px", cursor: "pointer" }}
            onClick={() => {
              setIsText(!isText);
            }}
            className="eye"
          >
            {isText ? <AiFillEye /> : <AiFillEyeInvisible />}
          </span>
        </div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default CheckPasswordInput;
