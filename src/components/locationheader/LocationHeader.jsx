import { Row, Col, Menu, Input } from "antd";
import Navbar from "../common/navbar/Navbar";
import map from "../../Assets1/map.png";
import Group94 from "../../assets/Group94.png";
import locationIcon from "../../Assets1/locationIcon.png";

import styled from "styled-components";
import React from "react";
import { YouFindYouGo } from "../home/youfindyougo/YouFindYouGo";
export default function LocationHeader() {
  const { Search } = Input;
  const onSearch = (value) => console.log(value);
  const suffix = (
    <img
      src={Group94}
      style={{
        width: "20px",
        color: "black",
      }}
    />
  );
  return (
    <>
      <Wrapper>
        <Navbar />
        <YouFindYouGo />
        {/* <div className="demo-wrap">
          <img
            className="demo-bg"
            src={map}
            style={{ width: "100%", height: "600px" }}
            alt="location"
          />
          <div className="demo-content">
            <h1>YOU FIND,&nbsp;YOU GO,&nbsp;YOU PARK.</h1>
            <Menu
              mode="horizontal"
              className="header-nav"
              style={{
                background: "transparent",
                border: "none",
              }}
            >
              <Menu.Item>HALF DAY&nbsp;</Menu.Item>
              <Menu.Item>DAILY&nbsp;</Menu.Item>
              <Menu.Item>WEEKLY&nbsp;</Menu.Item>
              <Menu.Item>MONTHLY&nbsp;&nbsp;</Menu.Item>
            </Menu>

            <Input
              placeholder="where are you going ? "
              size="large"
              style={{
                width: "800px",
                position: "relative",
                left: "50%",
                borderRadius: "10px",
                boxShadow: "none",
                border: "none",
                marginTop: "10px",
              }}
              suffix={suffix}
            />
            <button>
              <span>
                &nbsp;use my location
                <img
                  style={{
                    width: "15px",
                    float: "right",
                    marginTop: "5px",
                    marginRight: "2px",
                  }}
                  src={locationIcon}
                />
              </span>
            </button>
          </div>
        </div> */}
      </Wrapper>
    </>
  );
}
export const Wrapper = styled.div`
  .navbar {
    padding-left: 50px;
    padding-right: 50px;
  }
  .demo-wrap {
    overflow: hidden;
    background-color: black;
    width: 100%;
    height: 600px;
    color: white;
  }

  .demo-bg {
    opacity: 0.6;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
  }

  .demo-content {
    position: relative;
    text-align: center;
    margin: auto;
    top: 50%;
    h1 {
      color: white;
      font-weight: 500;
    }
    button {
      background-color: #4d9d74;
      border-radius: 20px;
      border: none;

      width: 190px;
      padding: 5px;
      position: relative;
      right: -22%;
      margin-top: 10px;
      font-size: 18px;
    }
    .header-nav {
      color: white;
      position: relative;
      left: 35%;
      font-size: 18px;
      padding: 10px;
    }
    .header-nav :hover {
      color: white;
    }
    .header-nav :active {
      color: white;
    }
  }
  .ant-menu-title-content {
    color: white;
  }
  .ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-item:hover::after,
  .ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-submenu:hover::after,
  .ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-item-active::after,
  .ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-submenu-active::after,
  .ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-item-open::after,
  .ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-submenu-open::after,
  .ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-item-selected::after,
  .ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-submenu-selected::after {
    border-bottom: 2px solid white;
  }
`;
