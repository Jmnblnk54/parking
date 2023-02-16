import React, { useState } from "react";
import { Card, Radio } from "antd";
import styled from "styled-components";

import ae from "../../assets/icons/cards/amex.svg";
import mc from "../../assets/icons/cards/mastercard.svg";
import vs from "../../assets/icons/cards/visa.svg";
import dc from "../../assets/icons/cards/discover.svg";
import pp from "../../assets/icons/cards/paypal.svg";

export default function PaymentMethod(props) {
  return (
    <Wrapper>
      <Card title="Choose Your Payment Method">
        <Radio.Group value={props.value} onChange={props.onChange}>
          <Radio value={"Card"}>
            <div>Check out with credit card Here</div>
            <div>
              <img src={ae} className="card-img" alt="" />
              <img src={mc} className="card-img" alt="" />
              <img src={vs} className="card-img" alt="" />
              <img src={dc} className="card-img" alt="" />
            </div>
          </Radio>
          <Radio value={"Paypal"} onChange={props.onChange}>
            <div>Check out with PayPal</div>
            <img src={pp} style={{ width: "70px" }} alt="" />
          </Radio>
        </Radio.Group>
      </Card>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin: 20px 0px;
  .ant-card {
    .ant-card-head {
      padding: 0 10px;
      .ant-card-head-title {
        padding: 10px 0;
        font-weight: bold;
      }
    }
    .ant-card-body {
      padding: 10px;
      .ant-radio-group {
        display: flex;
        justify-content: space-around;
        .card-img {
          width: 35px;
          height: 44px;
          margin-right: 10px;
        }
      }
    }
  }
`;
