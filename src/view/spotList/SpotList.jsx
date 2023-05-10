import { Rate } from "antd";
import React from "react";
import styled from "styled-components";
import Navbar from "../../components/common/navbar/Navbar";

export const SpotList = () => {
  return (
    <Wrapper>host
      <div>
        <Navbar />
        <div className="spot-card-container">
          <div className="left">
            <div className="spot-image">{"Hassan"}</div>

            <div className="center-details">
              <h3>{"Hassan"}</h3>
              <div className="miles">{"Hassan"}</div>
              <div className="rating">
                <Rate disabled defaultValue={3} />
              </div>
            </div>
          </div>

          <div className="right-details">
            <div className="amount">$ {""}</div>
            <div className="buttons">
              <div className="details-button">details</div>
              <button className="book-now-button">BOOK NOW</button>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default SpotList;

const Wrapper = styled.div`
  margin-bottom: 10px;
  .spot-card-container {
    background: #fff;
    border-radius: 15px;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .left {
    display: flex;
    align-items: center;
  }
  .ant-rate {
    color: #4d9d74;
    font-size: 12px;
    li {
      margin-right: 4px;
    }
  }

  .center-details {
    margin-left: 10px;
    h3 {
      margin: 0px;
      font-weight: bold;
    }
    .miles {
      margin-top: -3px;
      font-weight: bold;
    }
    .rating {
      margin-top: -3px;
    }
  }

  .right-details {
    display: flex;
    flex-direction: column;
    align-items: end;
  }

  .buttons {
    display: flex;
    align-items: end;
  }
  .amount {
    font-size: 22px;
    font-weight: bold;
  }

  .details-button {
    padding: 6px 20px;
    border: none;
    border-radius: 20px;
    color: black;
    font-size: 1rem;
    cursor: pointer;
    margin-left: 5px;
    text-decoration: underline;
  }

  .book-now-button {
    background: #4d9d74;
    padding: 6px 20px;
    border: none;
    border-radius: 20px;
    color: #fff;
    font-size: 1rem;
    cursor: pointer;
    margin-left: 5px;
  }

  .book-now-button:hover {
    background: #6db992;
  }

  @media screen and (max-width: 900px) {
    .spot-card-container {
      display: flex;
      flex-direction: column;
      align-items: inherit;
    }
  }

  @media screen and (max-width: 500px) {
    .spots {
      display: flex !important;
      flex-direction: column !important;
    }
    .spots-container {
      width: 100%;
    }
  }
`;
