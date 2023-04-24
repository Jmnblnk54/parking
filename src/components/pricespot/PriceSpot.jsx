import { useState,  useEffect} from "react";
import { Card, Col, Row, Input, Checkbox, Radio, Tooltip } from "antd";
import styled from "styled-components";
import { InfoCircleFilled } from "@ant-design/icons";

export default function PriceSpot(props) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(0); // Reset input count on every refresh
  }, []);

  const handleClick = () => {
    setCount(count + 1);
  }

  const [value, setValue] = useState(2);

  const onChange = (e) => {
    console.log("checked box", e.target.value);
    setValue(e.target.value);
    handleClick();
  };
  // console.log(props.halfDay);
  // console.log(props.daily);
  // console.log(props.weekly);
  // console.log(props.monthly);

  return (
    <>
      <Wrapper>
        <Card className="price-spot" bordered={false}>
          <div className="num-row">
            <h2 style={{ color: count >= 2 ? 'green' : '#c7c7c7' }}>2</h2>
          </div>
          <h1>Price your spot(s)</h1>
          <div
            className={props.halfDay ? "row-card" : "row-card disabled"} >
            <div className="time-col">
              <button>Hourly</button>
            </div>
            <Col xl={5}>
            <div className="col">
              <div className="price-row">
                <Col lg={5}>$&nbsp;</Col>
                <div className="input-col">
                  <input
                    type="number"
                    className="input-price"
                    placeholder="00"
                    min="1"
                    max="99"
                    disabled={!props.halfDay}
                    value={props.data.halfDayPrice}
                    onChange={(e) => {
                      handleClick();
                      props.setData({
                        ...props.data,
                        halfDayPrice: e.target.value,
                      });
                    }}
                  />
                  </div>
               </div> 
              </div>
            </Col>
          </div>
          <div className={props.daily ? "row-card" : "row-card disabled"}>
            <div className="time-col">
              <button>Daily</button>
            </div>
            <Col xl={5}>
            <div className="col">
              <div className="price-row">
                <Col lg={5}>$&nbsp;</Col>
                <div className="input-col">
                  <input
                    type="number"
                    className="input-price"
                    placeholder="00"
                    min="1"
                    max="99"
                    disabled={!props.daily}
                    value={props.data.dailyPrice}
                    onChange={(e) => {
                      handleClick();
                      props.setData({
                        ...props.data,
                        dailyPrice: e.target.value,
                      });
                    }}
                  />
                </div>
              </div>
              </div>
            </Col>
          </div>
          <div className={props.weekly ? "row-card" : "row-card disabled"} >
            <div className="time-col">
              <button>Weekly</button>
            </div>
            <Col xl={5}>
              <div className="col">
              <div className="price-row">
                <Col lg={5}>$&nbsp;</Col>
                  <div className="input-col">
                    <input
                      type="number"
                      className="input-price"
                      placeholder="00"
                      min="1"
                      max="99"
                      disabled={!props.weekly}
                      value={props.data.weeklyPrice}
                      onChange={(e) => {
                        handleClick();
                        props.setData({
                          ...props.data,
                          weeklyPrice: e.target.value,
                        });
                      }}
                    />
                  </div>
                </div>
              </div>
            </Col>
          </div>
          <div className={props.monthly ? "row-card" : "row-card disabled"} >
            <div className="time-col">
              <button>Monthly</button>
            </div>
            <div className="col">
              <div className="price-row">
                <Col>$&nbsp;</Col>
                <div className="input-col">
                  <input
                    type="number"
                    className="input-price"
                    placeholder="00"
                    min="1"
                    max="99"
                    disabled={!props.monthly}
                    value={props.data.monthlyPrice}
                    onChange={(e) => {
                      handleClick();
                      props.setData({
                        ...props.data,
                        monthlyPrice: e.target.value,
                      });
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <Row>
            <Col>
              <p id="crypto-text">
                Do you accept the cryptocurrency payments?
                <Tooltip
                  title="We are currently working on this functionality as a form of payment. 
                Please bare with us as we work to resolve this issue."
                >
                  <InfoCircleFilled style={{ marginLeft: "5px" }} />
                </Tooltip>
              </p>
            </Col>
          </Row>
          <Row>
            <Col>
              <Radio.Group
                onChange={(e) => {
                  props.setData({
                    ...props.data,
                    cryptoCheck: e.target.value,
                  });
                }}
                value={props.data.cryptoCheck}
              >
                <Radio value={"Yes"}>Yes</Radio>
                <Radio value={"No"}>No</Radio>
              </Radio.Group>
            </Col>
          </Row>
        </Card>
      </Wrapper>
    </>
  );
}
export const Wrapper = styled.div`
  width: 100%;

  .price-row {
    display: flex;
    width: 100%;
    max-width: 75px;
  }

  .row-card {
    display: flex;
    justify-content: space-between;
    padding: 5px;
    align-items: center;
  }

  .price-spot {
    background-color: white;
    border-radius: 30px;
    height: 550px;
    button {
      background-color: #4d9d74;
      border-radius: 8px;
      width: 100%;
      text-align: center;
      color: white;
      border: none;
      height: 35px;
      font-weight: normal;

      width: 120px;
    }
    #crypto-text {
      margin-top: 10px;
      display: flex;
      align-items: center;
    }
    .num-row h2 {
      margin: 0;
      color: #c7c7c7;
      font-size: 20px;
    }
    .row-card {
      background-color: #eff0f2;
      border-radius: 10px;
      margin-top: 10px;
      button {
        margin-top: 10px;
        margin-bottom: 10px;
      }
      p {
        margin-top: 10px;
        margin-bottom: 10px;
        font-size: 18px;
      }
      .price-row {
        font-size: 18px;
        .input-price {
          width: 100%;
          background: transparent;
          border: 0;
          /* ::-webkit-outer-spin-button,
            ::-webkit-inner-spin-button {
              -webkit-appearance: none;
              margin: 0;
            } */
        }
      }
    }
    .row-card.disabled {
      background-color: #c7c7c7;
      button {
        background-color: #636363;
      }
    }
  }
`;
