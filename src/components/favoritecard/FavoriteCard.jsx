import React from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import { Card } from "antd";

export default function FavoriteCard() {
  const history = useHistory();

  return (
    <>
      <Wrapper>
        <Card className="user-profile-card">
          <h1>FAVORITES</h1>
          <p>View my favorite spots</p>
          <div className="buttons">
            <button
              className="book-now-button"
              onClick={() => history.push("/traveler/favorites")}
            >
              view
            </button>
          </div>
        </Card>
      </Wrapper>
    </>
  );
}
export const Wrapper = styled.div`
  width: 100%;
  .user-profile-card {
    box-shadow: 0px 5px 32px 0px rgba(214,214,214,1);
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
    .buttons {
      float: right;
      margin-top: -4px;
    }
    .book-now-button {
      background: #4d9d74;
      padding: 4px 10px;
      width: 100px;
      border: none;
      border-radius: 20px;
      color: #fff;
      font-size: 14px;
      cursor: pointer;
      margin-left: 5px;
    }
  }
`;
