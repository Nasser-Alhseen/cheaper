import { useEffect, useState } from "react";
import getProfile from "../../../functions/getProfile";
import Loading from "../../general/Loading";

function Profile(props) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProfile(props.setProfile, props.userInformation, props.toast);
  }, []);
  useEffect(() => {
    if (props.profile != -1) setLoading(false);
  }, [props.profile]);

  try {
    return (
      <>
        {loading ? (
          <div class="profile-main-area">
            <Loading />
          </div>
        ) : (
          <>{console.log(props.profile)} profile</>
        )}
      </>
    );
  } catch (error) {
    console.log(error);
  }
}

export default Profile;
