import { useState } from "react";
import generalTabs from "../constants/generalTabs";
import requestOptions from "../constants/requestOptions";
import Tab from "./Tab";
function Navbar(props) {
  async function logout() {
    try {
      let response = await fetch(`${import.meta.env.VITE_URL}/auth/logout`, { ...requestOptions, method: "get", headers: { ...requestOptions.headers, authorization: props.userInformation.token } });
      let data = await response.json();
      if (data.success) {
        localStorage.removeItem("user");
        props.navigate("/login");
      } else {
        console.log(data.error);
        props.toast.error("عذرا, حدث خطأ في السيرفر", {
          position: props.toast.POSITION.TOP_CENTER,
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

  const [show, setShow] = useState(true);

  try {
    return (
      <>
        <div className="left-area">
          <div className="app-name">Cheaper</div>

          <a
            href="#"
            className="item-link"
            id="pageLink"
            onClick={(event) => {
              event.preventDefault();
              document.body.classList.toggle("dark");
              document.documentElement.classList.toggle("dark");
            }}
          >
            <button className="mode-switch active">
              <svg className="sun" fill="none" stroke="#fbb046" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                <defs></defs>
                <circle cx="12" cy="12" r="5"></circle>
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"></path>
              </svg>
              <svg className="moon" fill="none" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                <defs></defs>
                <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"></path>
              </svg>
            </button>
          </a>

          {generalTabs.map((tab, tabIndex) => {
            return <Tab key={tabIndex} tab={tab} currentTab={props.currentTab} setCurrentTab={props.setCurrentTab} />;
          })}
          {props.tabs.map((tab, tabIndex) => {
            return <Tab key={tabIndex} tab={tab} currentTab={props.currentTab} setCurrentTab={props.setCurrentTab} />;
          })}
          {props.tabs.length ? (
            <button className="btn-logout" onClick={() => logout()}>
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="feather feather-log-out" viewBox="0 0 24 24">
                <defs></defs>
                <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"></path>
              </svg>
            </button>
          ) : (
            <li onClick={() => props.navigate("/login")}>
              <a style={{ color: "green", cursor: "pointer" }}>login</a>
            </li>
          )}
        </div>

        {/* <div className="dash">
          <header className="navbar-fixed-top">
            <div className="container">
              <nav className="webimenu">
                <div
                  className="menu-toggle"
                  onClick={() => {
                    setShow(!show);
                  }}
                >
                  <i className="fa fa-bars"> </i>
                </div>
                <ul className="ownmenu" style={{ display: show ? "block" : "none" }}>
                  {generalTabs.map((tab, tabIndex) => {
                    return <Tab key={tabIndex} tab={tab} currentTab={props.currentTab} setCurrentTab={props.setCurrentTab} />;
                  })}
                  {props.tabs.map((tab, tabIndex) => {
                    return <Tab key={tabIndex} tab={tab} currentTab={props.currentTab} setCurrentTab={props.setCurrentTab} />;
                  })}
                  {props.tabs.length ? (
                    <li onClick={() => logout()}>
                      <a style={{ color: "red", cursor: "pointer" }}>logout</a>
                    </li>
                  ) : (
                    <li onClick={() => props.navigate("/login")}>
                      <a style={{ color: "green", cursor: "pointer" }}>login</a>
                    </li>
                  )}
                </ul>
              </nav>
            </div>
          </header>
        </div> */}
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default Navbar;
