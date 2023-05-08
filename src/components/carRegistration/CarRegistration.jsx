import { AutoComplete, Input } from "antd";
import React, { useState } from "react";
import styled from "styled-components";
import { VehicleTypesMakes, VehicleYears } from "./Models";
const { Option } = AutoComplete;

function CarRegistration(props) {
  const [result, setResult] = useState([]);
  const [modelData, setModelData] = useState([]);

  const handleSearch = (value) => {
    setResult(value);
  };

  React.useEffect(() => {
    VehicleTypesMakes.forEach((doc) => {
      if (props.data?.make === doc.brand) {
        setModelData(doc.models);
      }
    });

    console.log("useEffect");
  }, [props.data?.make]);

  return (
    <Wrapperr>
      <div className="main-div">
        <div className="car-registration-div">
          <div className="header-div">
            <h1>Car Registration</h1>
          </div>
          <div className="registration-div">
            <AutoComplete
              className="autocomplete"
              placeholder="MAKE"
              onSearch={handleSearch}
              value={props.data?.make}
              onChange={(e) => {
                props.setData({
                  ...props.data,
                  make: e,
                });
              }}
              filterOption={(inputValue, option) =>
                option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !==
                -1
              }
            >
              {VehicleTypesMakes.map((item, key) => {
                return (
                  <Option key={key} value={item.brand}>
                    {item.brand}
                  </Option>
                );
              })}
            </AutoComplete>

            <AutoComplete
              disabled={modelData.length == 0 ? true : false}
              placeholder={
                modelData.length == 0 ? "SELECT MAKE FIRST" : "MODEL"
              }
              className="autocomplete"
              onSearch={handleSearch}
              value={props.data?.model}
              onChange={(e) => {
                props.setData({
                  ...props.data,
                  model: e,
                });
              }}
              filterOption={(inputValue, option) =>
                option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !==
                -1
              }
            >
              {modelData.map((item, key) => {
                return (
                  <Option key={key} value={item}>
                    {item}
                  </Option>
                );
              })}
            </AutoComplete>
            <AutoComplete
              placeholder="YEARS"
              className="autocomplete"
              onSearch={handleSearch}
              value={props.data?.year}
              // dropdownAlign={{ offset: [0, 00] }}
              onChange={(e) => {
                props.setData({
                  ...props.data,
                  year: e,
                });
              }}
              filterOption={(inputValue, option) =>
                option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !==
                -1
              }
            >
              {VehicleYears.map((item, key) => {
                return (
                  <Option className="abc" key={key} value={item}>
                    {item}
                  </Option>
                );
              })}
            </AutoComplete>
            <Input
              placeholder="CAR COLOR"
              value={props.data.carColor}
              onChange={(e) => {
                props.setData({
                  ...props.data,
                  carColor: e.target.value,
                });
              }}
            />

            <Input
              placeholder="LICENSE PLATE #"
              value={props.data.licenseNumber}
              onChange={(e) => {
                props.setData({
                  ...props.data,
                  licenseNumber: e.target.value,
                });
              }}
            />
          </div>
        </div>
      </div>
    </Wrapperr>
  );
}

export default CarRegistration;

const Wrapperr = styled.div`
  height: 100%;
  padding: 30px 30px 20px 30px;
  width: 100%;

  .main-div {
    background-color: #fff;
    width: 100%;
    height: 100%;
    border-radius: 20px;
  }
  .header-div {
    height: 15%;
  }
  .registration-div {
    height: 85%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .car-registration-div {
    height: 100%;
    padding: 20px 10px 35px 10px;
  }
  .autocomplete {
    width: 100%;
    margin-bottom: 5px;
    .ant-select-selector {
      border: none !important;
      border-bottom: 2px solid #f2f8f5 !important;
      width: 100%;
      height: 50px;
      padding-left: 10px;
      .ant-select-selection-placeholder {
        display: flex;
        align-items: center;
        color: black;
      }

      :hover {
        cursor: pointer;
        border: none;
        border-bottom: 2px solid black !important;
        width: 100%;
      }
      .ant-select-selection-search-input {
        height: 100%;
      }
    }
  }
  .ant-select-focused {
    box-shadow: 0 0 0 2px rgb(0 0 0);
    border-radius: 2px;
  }
  .ant-input {
    border: none !important;
    border-bottom: 2px solid #f2f8f5 !important;
    width: 100%;
    height: 50px;
    padding-left: 10px;
    margin-bottom: 5px;
    :focus {
      box-shadow: 0 0 0 2px rgb(0 0 0);
    }
    :hover {
      cursor: pointer;
      border: none;
      border-bottom: 2px solid black !important;
      width: 100%;
    }
  }
  /* input {
    border: none;
    border-bottom: 2px solid #f2f8f5;
    width: 100%;
    height: 50px;
    padding-left: 10px;
  }
  input:hover {
    cursor: pointer;
    border: none;
    border-bottom: 2px solid black;
    width: 100%;
  } */
`;
