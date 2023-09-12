import { useEffect, useState } from "react";
import getPermissions from "../../functions/getPermissions";
import getProfile from "../../functions/getProfile";
import getNotifications from "../../functions/getNotifications";

function ShopkeeperHome(props) {
  const [permissions, setPermissions] = useState({});
  const [profile, setProfile] = useState({});
  const [notifications, setNotifications] = useState({});

  useEffect(() => {
    getPermissions(setPermissions, props.userInformaiton, props.toast);
    getProfile(setProfile, props.userInformaiton, props.toast);
    getNotifications(setNotifications, notifications, props.userInformaiton, props.toast);
  }, []);

  try {
    return <>shopkeeper home</>;
  } catch (err) {
    console.log(err);
  }
}

export default ShopkeeperHome;
