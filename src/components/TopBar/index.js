import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import Logo from "../../icons/logo";
import LogOutIcon from "../../icons/exit";
import User from "../../icons/user";
import { AuthContext } from "../../Auth";
import { useState } from "react";
// import NotificationComponent, {
//   NotificationItem,
// } from "../NotificationComponent";
import "./TopBar.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import firebaseconfig from "../../config";

const App = () => {
  const [isShowNoti, setShowNoti] = useState(false);
  const { currentUser } = useContext(AuthContext);
  // console.log(currentUser)

  if (!currentUser) {
    return <Redirect to="/" />;
  }
  return (
    <div className="top-bar">
      {/* Logo */}
      <Link className="logo-content" to="/">
        <Logo width={"3rem"} height={"3rem"} className="logo-image" />
        <h4 className="text-logo">
          Powercare&nbsp;<p className="color-white">Clinic</p>
        </h4>
      </Link>

      {/* Menu */}
      <div className="menu-top-bar">
        <div className="dropdown">
          <Link to={{pathname:`/profile`,state:{
            uid : currentUser.uid
          }}}>
          <MenuTopBar>
            <User width="1.5rem" height="1.5rem" />
             <p className="username">&nbsp; สวัสดี คุณ{currentUser.displayName} </p>            
          </MenuTopBar>
          </Link>
          {/* <NotificationComponent isShow={isShowNoti}>
              {notificationMockupData.map((item, key) => (
                <NotificationItem
                  key={key}
                  title={item.title}
                  detail={item.detail}
                  readed={item.readed}
                />
              ))}
            </NotificationComponent> */}
        </div>
        <MenuTopBar
          title="ลงชื่อออก"
          onClick={() => firebaseconfig.auth().signOut()}
          styleText={{ color: "black" }}
        >
          <LogOutIcon width="1.2rem" height="1.2rem" />
        </MenuTopBar>
      </div>
    </div>
  );
};

const MenuTopBar = ({
  children,
  title,
  styleText,
  styleContent,
  onClick = () => {},
}) => {
  return (
    <div
      className="menu-top-bar-item"
      style={{ ...styleContent }}
      onClick={onClick}
    >
      {children}
      <p className="color-white" style={{ marginLeft: "0.5rem", ...styleText }}>
        {title}{" "}
      </p>
    </div>
  );
};

export default App;
