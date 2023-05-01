import React, { useState } from "react";
import styled from "styled-components";
import { Redirect, useHistory, useLocation } from "react-router";
import { ArrowLeftOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { SearchOutlined } from "@ant-design/icons";
import {
  Menu,
  Input,
  Dropdown,
  Space,
  Button,
  Popover,
  Modal,
  message,
} from "antd";

import "../../../style/VideoModal.css";

import logo from "../../../assets/icons/logo.svg";
import avatar from "../../../assets/icons/avatar.svg";
import Line1 from "../../../assets/Line1.png";
import Group94 from "../../../assets/Group94.png";
// import useAuth from "../../../hooks/useAuth.js";

import fire from "../../../config/config";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

// const { Search } = Input;

// const content = <div>Log out</div>;

export default function Navbar(props) {
  const history = useHistory();
  const location = useLocation();

  // const { user, userType } = useAuth();
  const session = localStorage.getItem("Auth Token");
  const type = localStorage.getItem("User Type");
  const [showSearch, setshowSearch] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [showVideo, setShowVideo] = useState(false);
  const [addressSearchByTraveler, setaddressSearchByTraveler] = useState("");
  const [locationData, setLocationData] = useState({
    latitude: "",
    longitude: "",
  });

  // const onSearch = (value) => console.log(value);
  const logoutHandle = async () => {
    setIsLoggedIn(!isLoggedIn);
    await fire
      .auth()
      .signOut()
      .then(() => {
        localStorage.clear();
        history.push("/");
        window.location.reload(false);
      })
      .catch(() => console.log("failed"));
  };

  const renderItems = () => (
    <Menu>
      {session ? (
        type === "HOST" ? (
          <>
            <Menu.Item onClick={() => history.push("/host/home")}>
              HOST&nbsp;
            </Menu.Item>
            <Menu.Item onClick={() => setShowVideo(true)}>
              HOW IT WORKS&nbsp;
            </Menu.Item>
            <Menu.Item onClick={() => history.push("/host/profile")}>
              Host YUGO
              <img
                style={{
                  marginLeft: "10px",
                  width: "30px",
                }}
                src={avatar}
                alt=""
              />
            </Menu.Item>
            <Menu.Item
              className="sub-menu-item"
              onClick={() => history.push("/host/transactions")}
            >
              TRANSACTION
            </Menu.Item>
            <Menu.Item style={{ color: "red" }} onClick={logoutHandle}>
              LOGOUT
            </Menu.Item>
          </>
        ) : (
          <>
            <Menu.Item onClick={() => history.push("/traveler/home")}>
              TRAVELER&nbsp;
            </Menu.Item>
            <Menu.Item onClick={() => setShowVideo(true)}>
              HOW IT WORKS&nbsp;
            </Menu.Item>

            <Menu.Item onClick={() => history.push("/traveler/profile")}>
              MY YUGO
              <img
                style={{
                  marginLeft: "10px",
                  width: "20px",
                }}
                src={avatar}
                alt=""
              />
            </Menu.Item>
            <Menu.Item
              className="sub-menu-item"
              onClick={() => history.push("/traveler/transactions")}
            >
              TRANSACTION
            </Menu.Item>
            <Menu.Item style={{ color: "red" }} onClick={logoutHandle}>
              LOGOUT
            </Menu.Item>
          </>
        )
      ) : (
        <>
          <Menu.Item onClick={() => history.push("/hosts")}>
            HOST&nbsp;
          </Menu.Item>
          <Menu.Item onClick={() => history.push("/travelers")}>
            TRAVELER&nbsp;
          </Menu.Item>
          <Menu.Item onClick={() => setShowVideo(true)}>
            HOW IT WORKS&nbsp;
          </Menu.Item>
          <Menu.Item onClick={() => history.push("/host/login")}>
            HOST LOG IN&nbsp;&nbsp;
          </Menu.Item>
          <Menu.Item onClick={() => history.push("/traveler/login")}>
            TRAVELER LOG IN&nbsp;&nbsp;
          </Menu.Item>
        </>
      )}
    </Menu>
  );

  const handleChange = (address) => {
    setaddressSearchByTraveler(address);
  };

  const handleMethod = () => {
    if (addressSearchByTraveler === "") {
      message.warning("Address Required!");
    } else {
      geocodeByAddress(addressSearchByTraveler)
        .then((results) => {
          getLatLng(results[0])
            .then((latLng) => {
              const coords = { latitude: null, longitude: null };

              coords.latitude = latLng?.lat;
              coords.longitude = latLng?.lng;
              if (session !== "" && type === "TRAVELER") {
                // console.log("spotType", spotType);
                history.push("/traveler/search", {
                  searchedBy: "searchbyaddress",
                  spotType: "Daily",
                  spotAddress: addressSearchByTraveler,
                  locationDetails: coords,
                });
              } else {
                history.push("/search", {
                  searchedBy: "searchbyaddress",
                  spotType: "Daily",
                  spotAddress: addressSearchByTraveler,
                  locationDetails: coords,
                });
              }
            })
            .catch((error) => console.error("Error", error));
        })
        .catch((error) => console.error("Error", error));
    }
  };

  const suffix = (
    <img
      src={Group94}
      style={{
        width: "20px",
        color: "black",
      }}
      alt=""
      onClick={handleMethod}
    />
  );

  return (
    <>
      <Wrapper
        style={
          props.transparent
            ? { background: "Transparent" }
            : { background: "white" }
        }
      >


          <div className="logo">
            <img
              src={logo}
              height={"40px"}
              onClick={() => history.push("/travelers")}
              alt=""
            />
          </div>
          {location.pathname.includes("/search") ? null : (
            <div className="search-drop-down">
              <div className="search-image">
                <SearchOutlined
                  style={{ fill: "black" }}
                  onClick={() => setshowSearch(!showSearch)}
                />
              </div>
            </div>
          )}

          {location.pathname.includes("/search") ? null : (
            <div className="search-div1">
              <PlacesAutocomplete
                value={addressSearchByTraveler}
                onChange={(e) => handleChange(e)}
                onSelect={(e) => handleChange(e)}
              >
                {({
                  getInputProps,
                  suggestions,
                  getSuggestionItemProps,
                  loading,
                }) => {
                  return (
                    <Dropdown
                      overlayClassName="top-search-dd"
                      key="dropdown"
                      placement="bottom"
                      visible={true}
                      overlay={
                        suggestions.length > 0 ? (
                          <Menu className="autocomplete-dropdown-container">
                            {loading}
                            {suggestions.map((suggestion, key) => {
                              const className = suggestion.active
                                ? "suggestion-item--active"
                                : "suggestion-item";
                              return (
                                <Menu.Item
                                  className={className}
                                  key={key}
                                  onClick={(event) => {
                                    getSuggestionItemProps(suggestion).onClick(
                                      event
                                    );
                                  }}
                                  onMouseDown={(event) => {
                                    getSuggestionItemProps(
                                      suggestion
                                    ).onMouseDown(event);
                                  }}
                                  onTouchEnd={(event) => {
                                    getSuggestionItemProps(suggestion).onTouchEnd(
                                      event
                                    );
                                  }}
                                  onTouchStart={(event) => {
                                    getSuggestionItemProps(
                                      suggestion
                                    ).onTouchStart(event);
                                  }}
                                  role="option"
                                >
                                  {suggestion.description.substring(0, 50)}
                                  {suggestion.description.length > 50 && "..."}
                                </Menu.Item>
                              );
                            })}
                          </Menu>
                        ) : (
                          <></>
                        )
                      }
                    >
                      <Input
                        placeholder="where are you going ? "
                        size="large"
                        suffix={suffix}
                        {...getInputProps({
                          className: "location-search-input",
                          name: "address",
                          placeholder: "where are you going ?",
                          size: "large",
                        })}
                        value={addressSearchByTraveler}
                        onKeyDownCapture={(e) => {
                          if (e.key == "Enter") {
                            handleMethod();
                          }
                        }}
                      />
                    </Dropdown>
                  );
                }}
              </PlacesAutocomplete>
            </div>
          )}
          <div className="click-menu-div">
            <Dropdown overlay={renderItems} trigger={["click"]}>
              <MenuFoldOutlined />
            </Dropdown>
          </div>
          <div className="nav-menu-div">
            <Menu mode="horizontal" disabledOverflow>
              {/* // <Popover placement="bottomLeft" content={content} trigger="click"> */}

              {session ? (
                type === "HOST" ? (
                  <>
                    <Menu.Item onClick={() => history.push("/host/home")}>
                      HOST&nbsp;
                      <img src={Line1} height={"40px"} alt="" />
                    </Menu.Item>
                    <Menu.Item onClick={() => setShowVideo(true)}>
                      HOW IT WORKS&nbsp;
                      <img src={Line1} height={"40px"} alt="" />
                    </Menu.Item>
                    <Menu.SubMenu
                      className="sub-menu"
                      title={
                        <Menu.Item style={{ padding: "0px" }}>
                          Host YUGO
                          <img
                            style={{ margin: "10px", width: "30px" }}
                            src={avatar}
                            alt=""
                          />
                        </Menu.Item>
                      }
                    >
                      <Menu.Item
                        className="sub-menu-item"
                        onClick={() => history.push("/host/profile")}
                      >
                        PROFILE
                      </Menu.Item>
                      <Menu.Item
                        className="sub-menu-item"
                        onClick={() => history.push("/host/transactions")}
                      >
                        TRANSACTION
                      </Menu.Item>
                      <Menu.Item
                        className="sub-menu-item"
                        style={{ color: "red" }}
                        onClick={logoutHandle}
                      >
                        LOGOUT
                      </Menu.Item>
                    </Menu.SubMenu>
                  </>
                ) : (
                  <>
                    <Menu.Item onClick={() => history.push("/traveler/home")}>
                      TRAVELER&nbsp;
                      <img src={Line1} height={"40px"} alt="" />
                    </Menu.Item>
                    <Menu.Item onClick={() => setShowVideo(true)}>
                      HOW IT WORKS&nbsp;
                      <img src={Line1} height={"40px"} alt="" />
                    </Menu.Item>

                    <Menu.SubMenu
                      className="sub-menu"
                      title={
                        <Menu.Item style={{ padding: "0px" }}>
                          MY YUGO
                          <img
                            style={{ margin: "10px", width: "30px" }}
                            src={avatar}
                            alt=""
                          />
                        </Menu.Item>
                      }
                    >
                      <Menu.Item
                        className="sub-menu-item"
                        onClick={() => history.push("/traveler/profile")}
                      >
                        PROFILE
                      </Menu.Item>
                      <Menu.Item
                        className="sub-menu-item"
                        onClick={() => history.push("/traveler/transactions")}
                      >
                        TRANSACTION
                      </Menu.Item>
                      <Menu.Item
                        className="sub-menu-item"
                        style={{ color: "red" }}
                        onClick={logoutHandle}
                      >
                        LOGOUT
                      </Menu.Item>
                    </Menu.SubMenu>
                  </>
                )
              ) : (
                <>
                  <Menu.Item onClick={() => history.push("/hosts")}>
                    HOST&nbsp;
                    <img src={Line1} height={"40px"} alt="" />
                  </Menu.Item>
                  <Menu.Item onClick={() => history.push("/travelers")}>
                    TRAVELER&nbsp;
                    <img src={Line1} height={"40px"} alt="" />
                  </Menu.Item>

                  <Menu.Item onClick={() => setShowVideo(true)}>
                    HOW IT WORKS&nbsp;
                    <img src={Line1} height={"40px"} alt="" />
                  </Menu.Item>
                  <Menu.SubMenu
                    className="sub-menu"
                    title={
                      <Menu.Item style={{ padding: "0px" }}>
                        LOG IN&nbsp;&nbsp;
                      </Menu.Item>
                    }
                  >
                    <Menu.Item
                      className="sub-menu-item"
                      onClick={() => history.push("/host/login")}
                    >
                      LOGIN HOST
                    </Menu.Item>
                    <Menu.Item
                      className="sub-menu-item"
                      onClick={() => history.push("/traveler/login")}
                    >
                      LOGIN TRAVELER
                    </Menu.Item>
                  </Menu.SubMenu>
                </>
              )}

              {/* // </Popover> */}
              {/* <Menu.Item onClick={() => history.push("/traveler/profile")}>
                    My YUGO <img style={{ width: "30px" }} src={avatar} />
                  </Menu.Item> */}

              {/* {isLoggedIn ? (
              history?.location?.pathname.includes("host") ? (
                <Menu.Item onClick={() => history.push("/host/login")}>
                  LOG IN&nbsp;&nbsp;
                </Menu.Item>
              ) : (
                <Menu.Item onClick={() => history.push("/traveler/login")}>
                  LOG IN&nbsp;&nbsp;
                </Menu.Item>
              )
            ) : history?.location?.pathname.includes("host") ? (
              <Menu.Item onClick={() => history.push("/host/profile")}>
                Host YUGO
                <img style={{ width: "30px" }} src={avatar} />
              </Menu.Item>
            ) : (
              <Menu.Item onClick={() => history.push("/traveler/profile")}>
                My YUGO <img style={{ width: "30px" }} src={avatar} />
              </Menu.Item>
            )} */}
            </Menu>
          </div>

        <Modal
          className="video-modal"
          visible={showVideo}
          footer={false}
          closable={false}
        >
          <div className="top">
            <ArrowLeftOutlined onClick={() => setShowVideo(false)} />
            <h2>How it works</h2>
          </div>
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/wyIsVNGgdKk?rel=0"
            title="YUGO"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen="allowfullscreen"
          ></iframe>
        </Modal>
      </Wrapper>

      {showSearch && (
        <Super>
          <div className="search-div">
            <PlacesAutocomplete
              value={addressSearchByTraveler}
              onChange={(e) => handleChange(e)}
              onSelect={(e) => handleChange(e)}
            >
              {({
                getInputProps,
                suggestions,
                getSuggestionItemProps,
                loading,
              }) => {
                return (
                  <Dropdown
                    overlayClassName="top-search-dd"
                    key="dropdown"
                    placement="bottom"
                    visible={true}
                    overlay={
                      suggestions.length > 0 ? (
                        <Menu className="autocomplete-dropdown-container">
                          {loading}
                          {suggestions.map((suggestion, key) => {
                            const className = suggestion.active
                              ? "suggestion-item--active"
                              : "suggestion-item";
                            return (
                              <Menu.Item
                                className={className}
                                key={key}
                                onClick={(event) => {
                                  getSuggestionItemProps(suggestion).onClick(
                                    event
                                  );
                                }}
                                onMouseDown={(event) => {
                                  getSuggestionItemProps(
                                    suggestion
                                  ).onMouseDown(event);
                                }}
                                onTouchEnd={(event) => {
                                  getSuggestionItemProps(suggestion).onTouchEnd(
                                    event
                                  );
                                }}
                                onTouchStart={(event) => {
                                  getSuggestionItemProps(
                                    suggestion
                                  ).onTouchStart(event);
                                }}
                                role="option"
                              >
                                {suggestion.description.substring(0, 50)}
                                {suggestion.description.length > 50 && "..."}
                              </Menu.Item>
                            );
                          })}
                        </Menu>
                      ) : (
                        <></>
                      )
                    }
                  >
                    <Input
                      placeholder="where are you going ? "
                      size="large"
                      suffix={suffix}
                      {...getInputProps({
                        className: "location-search-input",
                        name: "address",
                        placeholder: "where are you going ?",
                        size: "large",
                      })}
                      value={addressSearchByTraveler}
                      onKeyDownCapture={(e) => {
                        if (e.key == "Enter") {
                          handleMethod();
                        }
                      }}
                    />
                  </Dropdown>
                );
              }}
            </PlacesAutocomplete>
          </div>
        </Super>
      )}
    </>
  );
}
export const Super = styled.div`

  @media screen and (min-width: 999px) {
    margin: -30px;
    display: none;
    .ant-input-affix-wrapper {
      display: none;
    }
  }
  @media screen and (max-width: 999px) {
    .search-div {
      width: 100%;
      input {
        width: 100%;
        border-radius: 20px;
        border-color: #080f28;
        stroke: #080f28;
      }
    }
    .ant-input-affix-wrapper {
      margin: 0px;
      height: 40px;
      width: 100%;
      border-radius: 20px;
      border-color: #080f28;
      stroke: #080f28;
    }
  }
`;
export const Wrapper = styled.div`
padding: 20px;
width: 100%;
display: flex;
justify-content: center;
margin: auto;
max-width: 1800px;
align-items: center;

  .logo {
    flex: 2;
    text-align: center;
    width: 100%;
    max-width: 200px;
    img {
      cursor: pointer;
    }
  }
  .ant-menu-horizontal {
    border: none;
    display: flex;
    justify-content: center;
  }
  .ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-item,
  .ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-submenu {
    padding: 3px;
    color: rgb(8,15,40);
    font-family: arciform;
    font-size: 19px;
    font-weight: 800;
    -webkit-text-fill-color: rgb(8,15,40);
  }
  .ant-input-affix-wrapper {
    height: 40px;
    width: 100%;
    border-radius: 20px;
    border-color: #080f28;
    stroke: #080f28;
  }
  .ant-input-affix-wrapper:not(.ant-input-affix-wrapper-disabled):hover {
    border-color: #080f28;
    stroke: #080f28;
    box-shadow: none;
  }
  @font-face {
    font-family: "Arciform";
    src: local("Arciform"), url("./fonts/Arciform.otf") format("otf");
    font-weight: normal;
  }

  .sub-menu-item {
    color: rgb(8,15,40);
  }

  .search-drop-down {
    display: none;
  }
  .search-div1 {
    float: right;
    display: block;
    cursor: pointer;
    width: 100%;
    flex: 2;
  }
  .ant-menu-horizontal {
    width: 100%;
  }

  .nav-menu-div {
    width: 100%;
    max-width: 400px;
    display: block;
    flex: 2;
  }
  .click-menu-div {
    display: none;
  }

  .location-search-input {
    border: 2px solid rgb(8,15,40);
  }

  @media screen and (max-width: 999px) {
    padding: 30px 20px 20px 30px;
    .logo {
      img {
        height: 30px;
        vertical-align: unset;
      }
    }
    .search-div1 {
      display: none;
    }
    .search-drop-down {
      width: 100%;
      display: block;
      font-size: 30px;
      height: 0px;
      margin-top: -20px;
      .anticon {
        float: right;
      }
      svg {
        margin-top: -5px;
      }
    }
    .nav-menu-div {
      display: none;
    }
    .click-menu-div {
      display: block;
      font-size: 30px;
      margin-left: 10px;
      svg {
        fill: black;
      }
    }
    .search-image {
      svg {
        fill: black;
      }
    }
  }
  @media screen and (max-width: 999px) {
    padding: 20px 30px 10px 30px;
  }
`;
