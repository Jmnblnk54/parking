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
          <h2>FAVORITES</h2>
          <p className="static-text">View my favorite spots</p>
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

      h2 {
        font-size: 1.5rem;
      }
    }
    .static-text {
      text-transform: capitalize;
      color: #b5b4b4;  
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
      font-size: 1rem;
      cursor: pointer;
      margin-left: 5px;
    }
  }
`;
