import React from "react";
import { Card, Row, Col } from "antd";
import styled from "styled-components";
import { useHistory } from "react-router";

export default function WalletCard({ user }) {
  const history = useHistory();
  const userType = localStorage.getItem("User Type");
  console.log(user);
  return (
    <>
      <Wrapper>
        <Card className="walletcard" bordered={false}>
          <h2>MY YUGO WALLET</h2>
          <h1>
            {user.wallet == undefined
              ? "$0"
              : "$ " + parseFloat(user.wallet).toFixed(2)}
          </h1>
          <button
            className="manage"
            onClick={() => {
              userType === "TRAVELER"
                ? history.push("/traveler/deposit")
                : history.push("/host/payouts");
            }}
          >
            manage balance
          </button>
        </Card>
      </Wrapper>
    </>
  );
}
export const Wrapper = styled.div`
  height: 370px;
  .walletcard {
    height: 100%;
    width: 100%;
    -webkit-box-shadow: 0px 0px 37px -3px rgba(194,194,194,1);
    -moz-box-shadow: 0px 0px 37px -3px rgba(194,194,194,1);
    box-shadow: 0px 0px 37px -3px rgba(194,194,194,1);
    background-color: rgba(77, 157, 116, 0.2);
    text-align: center;
    border-radius: 20px;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .ant-card-body {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      ::before,
      ::after {
        display: none;
      }
    }
  }
  h2 {
    font-size: 28px;

    font-weight: normal;
  }
  h1 {
    font-size: 100px;
    color: #4d9d74;
    line-height: 0.7;
  }
  button {
    background-color: #4d9d74;
    color: white;
    border-radius: 30px;
    width: 100%;
    padding: 9px;
    border: 0px;
    font-size: 1rem;
    font-weight: normal;
    cursor: pointer;
  }
  @media screen and (max-width: 991px) {
    .walletcard {
      min-height: fit-content;
      .ant-card-body {
        h1,
        h2 {
          margin: 0;
        }
      }
    }
  }
`;
