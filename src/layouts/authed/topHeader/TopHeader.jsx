import React, { useState } from "react";
import { Wrapper } from "./TopHeader.styled";
import { Input, Drawer } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import info from "../../../assets/icons/info.svg";
import video from "../../../assets/icons/video.svg";
import notification from "../../../assets/icons/notification.svg";
import profile from "../../../assets/icons/profile.svg";
import { useDispatch, useSelector } from "react-redux";
import hamBurgerIcon from "../../../assets/icons/hamBurger.svg";
import SideBar from "../sidebar/SidebarPage";
import { Popover } from "antd";
import { useHistory } from "react-router-dom";

import messageIcon from "../../../assets/icons/messageIcon.png";
import errorIcon from "../../../assets/icons/errorIcon.png";

import NotificationCard from "../../../components/notificationCard/NotificationCard";

export default function IndexPage() {
  const dispatch = useDispatch();
  const isCollapse = useSelector((state) => state.common.isCollapse);
  const history = useHistory();

  const [visible, setVisible] = useState(false);

  const suffix = (
    <SearchOutlined
      style={{
        fontSize: 16,
        color: "white",
      }}
    />
  );

  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };

  const settingContent = (
    <div className="settingDetails">
      <span onClick={(e) => history.push("/viewer-profile")}>Profile</span>
      <span>Setting</span>
      <span className="logout">Logout</span>
    </div>
  );

  const notificationContent = (
    <div>
      <NotificationCard
        Type="Message"
        Color="#258bdc"
        From="Furqan Aslam"
        Icon={messageIcon}
      />
      <NotificationCard
        Type="Error"
        Color="#e40613"
        From="Profile Setting"
        Icon={errorIcon}
      />
      <NotificationCard
        Type="Message"
        Color="#258bdc"
        From="Hasan Ali"
        Icon={messageIcon}
      />
    </div>
  );

  return (
    <Wrapper>
      <div className="topBar">
        <div className="leftSide">
          <div className={isCollapse ? "hamBurgerShow" : "hamBurgerHide"}>
            <img
              src={hamBurgerIcon}
              onClick={() => {
                dispatch({
                  type: "SET_COLLAPSE",
                  payload: {
                    isCollapse: !isCollapse,
                  },
                });
              }}
            />
          </div>

          <div className="sideDrawerIcon">
            <img src={hamBurgerIcon} onClick={showDrawer} />
          </div>

          <Drawer
            className="drawer"
            title="Basic Drawer"
            placement="left"
            closable={false}
            onClose={onClose}
            visible={visible}
            width="40%"
          >
            <SideBar />
          </Drawer>

          <div
            className={
              isCollapse
                ? `${
                    history.location.pathname == "/pond"
                      ? "headingShow-resize"
                      : "headingHide"
                  }`
                : `${
                    history.location.pathname == "/pond"
                      ? "headingShow"
                      : "headingHide"
                  }`
            }
          >
            New Fish in the Pond
          </div>

          <div
            className={
              isCollapse
                ? `${
                    history.location.pathname == "/vending"
                      ? "headingShow-resize"
                      : "headingHide"
                  }`
                : `${
                    history.location.pathname == "/vending"
                      ? "headingShow"
                      : "headingHide"
                  }`
            }
          >
            <p>Fish Food Vending</p>
          </div>

          <div
            className={
              isCollapse
                ? `${
                    history.location.pathname == "/pond" ||
                    history.location.pathname == "/vending"
                      ? "searchBarSmall"
                      : "searchBarLarge"
                  }`
                : `${
                    history.location.pathname == "/pond" ||
                    history.location.pathname == "/vending"
                      ? "searchBarSmall"
                      : "searchBarLarge"
                  }`
            }
          >
            <Input
              placeholder="Search..."
              enterButton="Search"
              size="medium"
              suffix={suffix}
            />
          </div>
        </div>

        <div className="topBarIcons">
          <img className="infoIcon" src={info} />
          <img className="videoIcon" src={video} />

          <Popover
            content={notificationContent}
            title="Notifiactions"
            placement="topRight"
            overlayClassName="notificationPopover"
          >
            <img src={notification} />
          </Popover>

          <Popover
            content={settingContent}
            placement="topRight"
            overlayClassName="settingPopover"
          >
            <img src={profile} />
          </Popover>
        </div>
      </div>
    </Wrapper>
  );
}
