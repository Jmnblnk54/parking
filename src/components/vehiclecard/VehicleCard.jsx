import { Card } from "antd";
import React from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import deleteIcon from "../../assets/Group81.svg";

export default function VehicleCard({ user, handleDelete }) {
  const history = useHistory();
  console.log(user);

  return (
    <>
      <Wrapper>
        <Card className="user-profile-card">
          <h1>VEHICLE INFORMATION</h1>
          <p>
            {user.vehicleModel === ""
              ? "No Car Registered"
              : user?.vehicleMake + "\t" + user?.vehicleModel}
          </p>
          <p>
            {user.LicensePlateNumber === "" ||
            user.LicensePlateNumber === "undefined"
              ? "No License Number"
              : user.LicensePlateNumber}
          </p>
          {user.LicensePlateNumber ? (
            <div className="buttons">
              <img
                src={deleteIcon}
                width={"22px"}
                alt=""
                style={{ cursor: "pointer" }}
                onClick={handleDelete}
              />
              <button
                className="book-now-button"
                onClick={() => {
                  history.push({
                    pathname: "/traveler/manage",
                    state: {
                      docId: user?.docId,
                    },
                  });
                }}
              >
                edit
              </button>
            </div>
          ) : (
            <div className="buttons">
              <button
                className="book-now-button"
                onClick={() => {
                  history.push({
                    pathname: "/traveler/manage",
                    state: {
                      docId: user?.docId,
                    },
                  });
                }}
              >
                add
              </button>
            </div>
          )}
        </Card>
      </Wrapper>
    </>
  );
}
export const Wrapper = styled.div`
  width: 100%;
  .user-profile-card {
    border-radius: 20px;
    margin-top: 20px;
    -webkit-box-shadow: 0px 0px 37px -3px rgba(194,194,194,1);
-moz-box-shadow: 0px 0px 37px -3px rgba(194,194,194,1);
box-shadow: 0px 0px 37px -3px rgba(194,194,194,1);
    .ant-card-body {
      padding: 5px 16px 11px 18px;
      h1 {
        margin: 0px;
        white-space: nowrap;
      }
    }
    p {
      margin: 0px;
      margin-top: -5px;
    }
    .buttons {
      float: right;
      margin-top: -19px;
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
      font-size: 14px;
      cursor: pointer;
      margin-left: 5px;
    }
  }
`;
