import { useEffect, useState } from "react";
import getPermissions from "../../functions/getPermissions";
import getProfile from "../../functions/getProfile";
import getNotifications from "../../functions/getNotifications";
import Navbar from "../../components/Navbar";
import { Route, Routes } from "react-router-dom";
import { adminTabs } from "../../constants/generalTabs";
import Loading from "../general/Loading";
import Profile from "./profile/Profile";
import Categories from "./categories/categories";
import Roles from "./roles/Roles";
import Blocks from "./blocks/Blocks";
import Packs from "./packs/Packs";
import Employees from "./employees/Employees";
import Main from "../general/Main";
import Home from "./homePage/home";
import Users from "./users/Users";
import { userChartData } from "./homePage/data/userChartData";
import { storeChartData } from "./homePage/data/storeChartData";
import { cartChartData } from "./homePage/data/cartChartData";
import { cityChartData } from "./homePage/data/cityChartData";
import UserProfile from "./users/UserProfile";

function AdminHome(props) {
  const [currentTab, setCurrentTab] = useState("home");
  const [permissions, setPermissions] = useState(-1);
  const [profile, setProfile] = useState(-1);
  const [categories, setCategories] = useState(-1);
  const [roles, setRoles] = useState(-1);
  const [blocks, setBlocks] = useState(-1);
  const [packs, setPacks] = useState(-1);
  const [packsChart, setPacksChart] = useState(-1);
  const [notifications, setNotifications] = useState(-1);
  const [employees, setEmployees] = useState(-1);
  const [users, setUsers] = useState(-1);
  const [notificationsPageNumber, setNotificationsPageNumber] = useState(1);
  const [homeCount, setHomeCount] = useState(userChartData);
  const [homeUserChart, setHomeUserChart] = useState(userChartData);
  const [homeStoreChart, setHomeStoreChart] = useState(storeChartData);
  const [homeCityChart, setHomeCityChart] = useState(cityChartData);
  const [homeCartChart, setHomeCartChart] = useState(cartChartData);
  const [usersStatisticsInfo, setUserStatisticsInfo] = useState(-1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPermissions(setPermissions, props.userInformation, props.toast);
    getNotifications(setNotifications, notifications, props.userInformation, props.toast, notificationsPageNumber, setNotificationsPageNumber);
  }, []);
  useEffect(() => {
    if (permissions != -1 && notifications != -1) setLoading(false);
  }, [permissions, notifications]);

  try {
    return (
      <>
        {loading ? (
          <Loading />
        ) : (
          <>
            <Navbar tabs={adminTabs} setCurrentTab={setCurrentTab} currentTab={currentTab} userInformation={props.userInformation} toast={props.toast} navigate={props.navigate} />
            <Routes>
              <Route path="/" exact element={<Main />} />
              <Route path="/main" exact element={<Main />} />
              <Route
                path="/home"
                exact
                element={
                  <Home
                    homeCount={homeCount}
                    setHomeCount={setHomeCount}
                    homeUserChart={homeUserChart}
                    setHomeUserChart={setHomeUserChart}
                    homeStoreChart={homeStoreChart}
                    setHomeStoreChart={setHomeStoreChart}
                    homeCityChart={homeCityChart}
                    setHomeCityChart={setHomeCityChart}
                    homeCartChart={homeCartChart}
                    setHomeCartChart={setHomeCartChart}
                    userInformation={props.userInformation}
                    toast={props.toast}
                    navigate={props.navigate}
                  />
                }
              />
              <Route path="/profile" exact element={<Profile profile={profile} setProfile={setProfile} userInformation={props.userInformation} toast={props.toast} navigate={props.navigate} />} />
              <Route path="/categories" exact element={<Categories categories={categories} setCategories={setCategories} userInformation={props.userInformation} toast={props.toast} navigate={props.navigate} />} />
              <Route path="/roles" exact element={<Roles roles={roles} setRoles={setRoles} employees={employees} setEmployees={setEmployees} userInformation={props.userInformation} toast={props.toast} navigate={props.navigate} />} />
              <Route path="/blocks" exact element={<Blocks blocks={blocks} setBlocks={setBlocks} userInformation={props.userInformation} toast={props.toast} navigate={props.navigate} />} />
              <Route path="/packs" exact element={<Packs packs={packs} setPacks={setPacks} packsChart={packsChart} setPacksChart={setPacksChart} userInformation={props.userInformation} toast={props.toast} navigate={props.navigate} />} />
              <Route path="/employees" exact element={<Employees employees={employees} roles={roles} setRoles={setRoles} setEmployees={setEmployees} userInformation={props.userInformation} toast={props.toast} navigate={props.navigate} />} />
              <Route path="/users" exact element={<Users users={users} setUsers={setUsers} blocks={blocks} setBlocks={setBlocks} usersStatisticsInfo={usersStatisticsInfo} setUserStatisticsInfo={setUserStatisticsInfo} userInformation={props.userInformation} toast={props.toast} navigate={props.navigate} />} />
              <Route path="/users/:id" exact element={<UserProfile users={users} setUsers={setUsers} blocks={blocks} setBlocks={setBlocks} usersStatisticsInfo={usersStatisticsInfo} setUserStatisticsInfo={setUserStatisticsInfo} userInformation={props.userInformation} toast={props.toast} navigate={props.navigate} />} />
            </Routes>
          </>
        )}
      </>
    );
  } catch (error) {
    console.log(error);
  }
}

export default AdminHome;
