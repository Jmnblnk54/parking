import React from "react";
import { useHistory } from "react-router";

import { Card } from "antd";
import styled from "styled-components";

export default function UpcomingReservation() {
  const history = useHistory();

  return (
    <Wrapper>
      <Card className="user-profile-card" bordered={false}>
        <h2>MY SPOTS</h2>
        <p class="sub-text">View my spots</p>
        <div className="buttons">
          <button
            className="book-now-button"
            style={{ cursor: "pointer" }}
            onClick={() => history.push("/host/myspots")}
          >
            view
          </button>
        </div>
      </Card>
    </Wrapper>
  );
}

export const Wrapper = styled.div`
  width: 100%;
  .user-profile-card {
    -webkit-box-shadow: 0px 0px 37px -3px rgba(194,194,194,1);
    -moz-box-shadow: 0px 0px 37px -3px rgba(194,194,194,1);
    box-shadow: 0px 0px 37px -3px rgba(194,194,194,1);
    border-radius: 20px;
    margin-top: 20px;
    .ant-card-body {
      padding: 5px 16px 11px 18px;
      h1 {
        margin: 0px;
      }
    }
    p {
      margin: 0px;
      margin-top: -5px;
    }
    h2 {
      font-size: 1.5rem;
    }
    .buttons {
      float: right;
      margin-top: -4px;
      img {
        vertical-align: top;
      }
    }
    .book-now-button {
      background: #4d9d74;
      padding: 4px 10px;
      width: 100px;
      border: none;
      border-radius: 20px;
      color: #fff;
      font-size: 1rem;
      cursor: pointer;
      margin-left: 5px;
    }
  }
  .sub-text {
    margin-top: 20px;
    text-transform: capitalize;
    color: #b5b4b4;
  }
`;
