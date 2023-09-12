import { useState } from "react";
import PackCard from "./PackCard";
import ProfileDetails from "./ProfileDetails";
import ProfileHeader from "./ProfileHeader";
import ShopsTable from "./ShopsTable";
import StatusImages from "./StatusImages";

function ProfileLeft(props) {
  const [openCollapse, setOpenCollapse] = useState(false);
  try {
    return (
      <>
        <div className="profile-left">
          <StatusImages />

          <div className="main-header-titel">
            <h1 href="#">رؤية جميع التقيمات</h1>
            <div className="dropdown">
              <button onclick="toggleDropdown()" className="dropbtn">
                •••
              </button>
              <ul id="myDropdown" className="dropdown-content">
                <li>
                  <a href="#">عرض الحساب الشخصي</a>
                </li>
                <li>
                  <a href="#">عرض قائمة الحظورات</a>
                </li>
                <li>
                  <a href="#">حذف</a>
                </li>
              </ul>
            </div>
          </div>

          <ProfileHeader />

          <ProfileDetails />

          <ShopsTable />

          <div className="panel panel-default">
            <div
              className="panel-heading"
              role="tab"
              id="headingOne"
              onClick={() => {
                setOpenCollapse(!openCollapse);
              }}
            >
              <h4 className="panel-title">
                <a className={openCollapse ? "collapsed" : ""} role="button">
                  Collapsible Group Item #2
                </a>
              </h4>
            </div>

            {openCollapse ? (
              <>
                <div id="collapseOne" className="panel-collapse collapse" aria-expanded="false" style={{ height: "0px" }}>
                  <div className="panel-body">
                    <div className="right-area-header-wrapper">
                      <PackCard />
                      <PackCard />
                    </div>
                  </div>
                </div>
              </>
            ) : null}
          </div>
        </div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default ProfileLeft;
