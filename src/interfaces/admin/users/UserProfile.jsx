import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../../general/Loading";
import getUserProfile from "./function/getUserProfile";
import "./css/userProfile.css";
import ProfileLeft from "./profileSection/profileLeft";
import ProfileBody from "./profileSection/ProfileBody";

function UserProfile(props) {
  const params = useParams();
  const [userProfile, setUserProfile] = useState(true);

  useEffect(() => {
    getUserProfile(props.userInformation, params.id, setUserProfile, userProfile, props.toast);
  }, []);

  try {
    return (
      <>
        {userProfile ? (
          <>
            <div className="profile-main-area">
              <button className="btn-show-right-area">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-left">
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              </button>
              <button className="btn-show-left-area">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
              </button>

              <div className="main-profile">
                <ProfileLeft />

                <ProfileBody />
              </div>
            </div>
          </>
        ) : (
          <Loading />
        )}
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default UserProfile;
