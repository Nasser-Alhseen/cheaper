import requestOptions from "../../../../constants/requestOptions";

export default async function getUserStatistics(userInformation, setUsersStatisticsInfo, usersStatisticsInfo, toast) {
  try {
    let response = await fetch(`${import.meta.env.VITE_URL}/admin/users/statisticsInfo`, { ...requestOptions, method: "get", headers: { ...requestOptions.headers, authorization: userInformation.token } });
    let data = await response.json();
    if (data.success) {
      console.log(data);
      // setUsers({ ...users, ...finalUsers });
    } else {
      console.log(data.error);
      toast.error("عذرا, حدث خطأ في السيرفر", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  } catch (err) {
    console.log(err);
  }
}
