import requestOptions from "../../../../constants/requestOptions";

export default async function getUsers(userInformation, setUsers, users, toast, filter, usersPage, setUsersPage) {
  try {
    console.log("helllllo");
    setUsersPage({ ...usersPage, loadingNow: true });
    let url = `${import.meta.env.VITE_URL}/admin/users/?`;
    let andMark = false;
    await Promise.all(
      Object.keys(filter).map((filterKey) => {
        if (filter[filterKey] != -1 && filter[filterKey] != "") {
          if (andMark) url += `&`;
          url += `${filterKey}=${filter[filterKey]}`;
          andMark = true;
        }
      })
    );
    if (andMark) url += `&`;
    url += `page=${usersPage.page}`;
    andMark = true;
    if (andMark) url += `&`;
    url += `size=${usersPage.size}`;
    let response = await fetch(url, { ...requestOptions, method: "get", headers: { ...requestOptions.headers, authorization: userInformation.token } });
    let data = await response.json();
    console.log("data", data);
    if (data.success) {
      if (!data.data.length) {
        setUsersPage({ ...usersPage, loadMore: false, loadingNow: false });
        if (users == -1) setUsers({});
      } else {
        let finalUsers = {};
        await Promise.all(
          data.data.map(async (user) => {
            finalUsers[user.userInfo.id] = { ...user.userInfo, checkIfBlocked: user.checkIfBlocked };
          })
        );

        if (usersPage.page == 1) setUsers({ ...finalUsers });
        else setUsers({ ...users, ...finalUsers });

        setUsersPage({ ...usersPage, page: usersPage.page + 1, loadMore: true, loadingNow: false });
      }
    } else {
      setUsersPage({ ...usersPage, loadingNow: false });
      console.log(data.error);
      toast.error("عذرا, حدث خطأ في السيرفر", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  } catch (err) {
    setUsersPage({ ...usersPage, loadingNow: false });
    console.log(err);
  }
}
