import { useEffect, useState } from "react";
import Loading from "../../general/Loading";
import requestOptions from "../../../constants/requestOptions";
import UserItem from "./UserItem";
import UpdateUser from "./UpdateUser";
import getUsers from "./function/getUsers";
import UserSearch from "./UserSearch";
import getUserStatistics from "./function/getUserStatistics";
import { usersAges } from "./data/usersAges";
import Chart from "react-apexcharts";
import UserBlocks from "./UserBlocks";
import Popup from "../../general/Popup";
import getBlocks from "../blocks/functions/getBlocks";
import LoadMoreUsers from "./LoadMoreUsers";

function Users(props) {
  const [loading, setLoading] = useState(true);
  const [loadingUsersStatisticsInfo, setLoadingUsersStatisticsInfo] = useState(true);
  const [currentEdit, setCurrentEdit] = useState(false);
  const [currentShowBlocks, setCurrentShowBlocks] = useState(false);
  const [usersPage, setUsersPage] = useState({ page: 1, size: 5, loadMore: true, loadingNow: false });
  const [filter, setFilter] = useState({ search: "", gender: -1, blocked: -1, active: -1 });

  const [items, setItems] = useState([]);
  useEffect(() => {
    try {
      const populateArray = async () => {
        const newArr = await Promise.all(
          Object.keys(props.users).map(async (userId, userIndex) => {
            const isTrue = true;
            //   const isTrue = await compare(searchOptions["roles"][props.search.field], props.search.operator, props.roles[role][props.search.field], props.search.word);
            if (isTrue) {
              return <UserItem key={userIndex} user={props.users[userId]} deleteUser={deleteUser} setCurrentEdit={setCurrentEdit} setCurrentShowBlocks={setCurrentShowBlocks} userInformation={props.userInformation} toast={props.toast} navigate={props.navigate} />;
            }
          })
        );
        setItems([...newArr]);
      };

      populateArray();
    } catch (err) {
      console.log(err);
    }
  }, [props.users, currentEdit, currentShowBlocks]);

  useEffect(() => {
    if (!usersPage.loadingNow) getUsers(props.userInformation, props.setUsers, props.users, props.toast, filter, { ...usersPage, page: 1, loadMore: true }, setUsersPage);
  }, [filter]);
  useEffect(() => {
    getBlocks(props.userInformation, props.setBlocks, props.toast);
  }, []);
  useEffect(() => {
    console.log(props.users, props.blocks);
    if (props.users != -1 && props.blocks != -1) setLoading(false);
  }, [props.users, props.blocks]);

  useEffect(() => {
    if (loadingUsersStatisticsInfo) getUserStatistics(props.userInformation, props.setUsersStatisticsInfo, props.usersStatisticsInfo, props.toast);
  }, []);
  useEffect(() => {
    if (props.usersStatisticsInfo != -1) setLoadingUsersStatisticsInfo(false);
  }, [props.usersStatisticsInfo]);

  async function deleteUser(id) {
    try {
      const response = await fetch(`${import.meta.env.VITE_URL}/admin/users/delete/${id}`, { ...requestOptions, headers: { ...requestOptions.headers, authorization: props.userInformation.token }, method: "delete" });
      const data = await response.json();
      if (data.success) {
        delete props.users[id];
        props.setUsers({ ...props.users });
        props.toast.success("تم حذف المستخدم", {
          position: props.toast.POSITION.TOP_CENTER,
        });
      } else {
        console.log(data.error);
        props.toast.error(data.error, {
          position: props.toast.POSITION.TOP_CENTER,
        });
      }
    } catch (err) {
      props.toast.error("عذرا, حدث خطأ ما", {
        position: props.toast.POSITION.TOP_CENTER,
      });
      console.log(err);
    }
  }

  try {
    return (
      <>
        {loading ? (
          <div class="profile-main-area">
            <Loading />
          </div>
        ) : (
          <>
            <div className="users-main-area">
              <div className="app-content">
                <UserSearch filter={filter} setFilter={setFilter} usersPage={usersPage} setUsersPage={setUsersPage} />

                <div className="products-area-wrapper tableView">
                  <div className="products-header">
                    <div className="product-cell image">الاسم</div>
                    <div className="product-cell category">اسم المستخدم</div>
                    <div className="product-cell price">الهاتف</div>
                    <div className="product-cell sales">الجنس</div>
                    <div className="product-cell stock">تاريخ الميلاد</div>
                    <div className="product-cell status-cell">حالة النشاط</div>
                    <div className="product-cell option">option</div>
                  </div>

                  {items.map((item) => {
                    return item;
                  })}

                  <LoadMoreUsers userInformation={props.userInformation} setUsers={props.setUsers} users={props.users} toast={props.toast} filter={filter} usersPage={usersPage} setUsersPage={setUsersPage} />
                </div>

                {currentEdit ? (
                  <>
                    <UpdateUser users={props.users} setUsers={props.setUsers} roles={props.roles} currentEdit={props.users[currentEdit]} setCurrentEdit={setCurrentEdit} userInformation={props.userInformation} navigate={props.navigate} toast={props.toast} />
                  </>
                ) : null}

                {currentShowBlocks ? (
                  <>
                    <Popup setOpen={setCurrentShowBlocks} component={<UserBlocks blocks={props.blocks} currentShowBlocks={props.users[currentShowBlocks]} userInformation={props.userInformation} navigate={props.navigate} toast={props.toast} />} />
                  </>
                ) : null}

                {/* <div
                  //   className="cityChart"
                  style={{
                    background: usersAges.color.backGround,
                    boxShadow: usersAges.color.boxShadow,
                  }}
                  //   layoutId={"expandableCard" + 3}
                  //   layoutTransition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <div className="chartContainer">{usersAges.loading ? "loading" : <Chart options={usersAges.options} series={usersAges.series} type="donut" />}</div>
                </div> */}
              </div>
            </div>
          </>
        )}
      </>
    );
  } catch (error) {
    console.log(error);
  }
}

export default Users;
