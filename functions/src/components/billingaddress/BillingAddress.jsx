import React, { useState } from "react";
import { Card, Input } from "antd";
import styled from "styled-components";
import AutoComplete from 'react-google-autocomplete';

export default function BillingAddress() {
  return (
    <Wrapper>
      <Card title={"Billing Address"}>
        <div className="form-row">
          <div>First Name</div>
          <Input></Input>
        </div>
        <div className="form-row">
          <div>Last Name</div>
          <Input></Input>
        </div>
        <div className="form-row">
          <div>Street Address</div>
          <Input></Input>
        </div>
        <div className="form-row" style={{ width: "50%" }}>
          <div>City</div>
          <Input></Input>
        </div>
        <div className="form-row" style={{ width: "50%" }}>
          <div>Zip</div>
          <Input></Input>
        </div>
        <div className="form-row">
          <div>State</div>
          {/* <Input></Input> */}
          <AutoComplete
            className='input'
            apiKey="AIzaSyBOxLBtGvegxeM8SRG98JYzg_UZMa1aYrk"
            onPlaceSelected={(place) => console.log(place)}
            options={{
              types: [ "(state)"],
              componentRestrictions: { country: "us" },
            }}
            placeholder="Enter State"
          />
        </div>
      </Card>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  .ant-card{
    .ant-card-head{
      padding: 0 10px;
      .ant-card-head-title{
        padding: 10px 0;
        font-weight: bold;
      }
    }
    .ant-card-body{
      padding: 10px;
    }
  }

`
