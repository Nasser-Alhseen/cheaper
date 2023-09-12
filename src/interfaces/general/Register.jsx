import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserRegisterForm from "../user/UserRegisterForm";
import ShopkeeperRegisterForm from "../shopkeeper/ShopkeeperRegisterForm";

function Register(props) {
  const [stepNumber, setStepNumber] = useState(0);
  const [userType, setUserType] = useState(0);
  const navigate = useNavigate();

  try {
    return (
      <>
        {stepNumber == 0 ? (
          <>
            <div className="container33">
              <h1>Create an Account With Us</h1>
              <form>
                <div className="have-account">
                  {"تمتلك حسابا بالفعل؟ "}
                  <span
                    onClick={() => {
                      navigate("/login");
                    }}
                  >
                     قم بتسجيل الدخول من هنا
                  </span>
                </div>
                <div className="row">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setUserType(0);
                      setStepNumber(1);
                    }}
                  >
                     صاحب محل 
                  </button>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setUserType(1);
                      setStepNumber(1);
                    }}
                  >
                    مستخدم عادي
                  </button>
                </div>
              </form>
            </div>
          </>
        ) : stepNumber == 1 ? (
          userType == 0 ? (
            <ShopkeeperRegisterForm setStepNumber={setStepNumber} toast={props.toast} />
          ) : (
            <UserRegisterForm setStepNumber={setStepNumber} toast={props.toast} />
          )
        ) : null}
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default Register;
