import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminHome from "../admin/AdminHome";
import GeneralHome from "./GeneralHome";
import UserHome from "../user/UserHome";
import ShopkeeperHome from "../shopkeeper/ShopkeeperHome";

function Hub(props) {
  const [userInformation, setUserInformation] = useState({});
  const [hub, setHub] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const result = JSON.parse(localStorage.getItem("userInformation"));
      if (result?.token) {
        setUserInformation({ ...result });
        if (result.userType == "user") setHub("user");
        else if (result.userType == "shopkeeper") setHub("shopkeeper");
        else if (result.userType == "admin") setHub("admin");
        else setHub("general");
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  try {
    return (
      <>
        {hub == "user" ? (
          <UserHome userInformation={userInformation} toast={props.toast} navigate={navigate} />
        ) : hub == "admin" ? (
          <AdminHome userInformation={userInformation} toast={props.toast} navigate={navigate} />
        ) : hub == "shopkeeper" ? (
          <ShopkeeperHome userInformation={userInformation} toast={props.toast} navigate={navigate} />
        ) : hub == "general" ? (
          <GeneralHome toast={props.toast} navigate={navigate} />
        ) : null}
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default Hub;
