import { Rate } from "antd";
import React from "react";
import styled from "styled-components";

import avatar from "../../../assets/icons/userIcon.svg";

function ReviewCard(props) {
  console.log(props.image);
  return (
    <Wrapper>
      <img src={props.image ? props.image : avatar} alt="" />
      <div>
        <div className="review-top">
          <div className="user">{props.user}</div>
          <Rate disabled value={props.rating} />
        </div>
        <div className="review">{props.review}</div>
      </div>
    </Wrapper>
  );
}

export default ReviewCard;

const Wrapper = styled.div`
  display: flex;
  img {
    width: 30px;
    margin-right: 5px;
    height: 30px;
    border-radius: 45px;

    object-fit: cover;
  }
  .user {
    font-size: 15px;
    color: #4d9d74;
  }
  .review {
    font-size: 12px;
    line-height: 12px;
  }
  .review-top {
    display: flex;
    justify-content: space-between;

    .ant-rate {
      display: flex;
      align-items: center;

      justify-content: flex-end;

      color: #4d9d74;
      li {
        font-size: 10px;
        margin-right: 3px;
      }
    }
  }
  @media screen and (max-width: 720px) {
    .user {
      font-size: 10px;
    }
    .review-top {
      .ant-rate {
        display: none !important;
      }
    }
    .review {
      font-size: 10px;
      line-height: 10px;
    }
    img {
      width: 20px;
      height: 20px;
    }
  }
`;
