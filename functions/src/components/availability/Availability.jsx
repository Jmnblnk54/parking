import { Card, Checkbox, Col, Row } from "antd";
import { useState } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import styled from "styled-components";

export default function Availabilty(props) {
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: "selection",
    },
  ]);

  return (
    <>
      <Wrapper>
        <Card className="availability-card" bordered={false}>
          <h1>Mark your availability</h1>

          <Row>
            <Col lg={24}>
              <DateRange
                minDate={new Date()}
                editableDateInputs={true}
                onChange={(item) => {
                  setState([item.selection]);
                  console.log(item.selection);
                  props.setData({
                    ...props.data,
                    startDate: item.selection.startDate.toUTCString(),
                    endDate: item.selection.endDate.toUTCString(),
                  });
                }}
                rangeColors={["#4d9d74", "#4d9d74", "#4d9d74"]}
                moveRangeOnFirstSelection={false}
                ranges={state}
              />
            </Col>
          </Row>
          <Checkbox
            onChange={() => {
              props.setData({
                ...props.data,
                check: true,
              });
            }}
            style={{ marginTop: "20px" }}
            value={props.data?.check}
          >
            I accept the
            <span style={{ color: "#4d9d74" }}>
              &nbsp;Terms Of Use and Privacy Policy
            </span>
          </Checkbox>
          <Row>
            <Col style={{ marginTop: "10px" }} lg={24}>
              <button onClick={props.handleListSpot} id="spot-button">
                List my spot
              </button>
            </Col>
          </Row>
        </Card>
      </Wrapper>
    </>
  );
}
export const Wrapper = styled.div`
  .availability-card {
    height: 550px;
    border-radius: 20px;
    #spot-button {
      background-color: #4d9d74;
      border-radius: 20px;
      text-align: center;
      color: white;
      border: none;
      height: 35px;
      font-size: 18px;
      font-weight: 100;
      width: 180px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: auto;
    }
    .fc .fc-button-primary:disabled {
      background-color: black;
      color: white;
    }
    .fc-direction-ltr .fc-button-group > .fc-button:not(:last-child) {
      display: none;
    }
    .fc .fc-toolbar-title {
      color: #4d9d47;
    }
    .fc-direction-ltr .fc-button-group > .fc-button:not(:first-child) {
      background-color: #4d9d47;
      color: white;
      box-shadow: none;
      border: none;
    }
    .fc .fc-col-header-cell-cushion {
      color: #4d9d47;
    }
    .fc .fc-daygrid-day-number {
      color: black;
    }

    .fc-scrollgrid-section
      fc-scrollgrid-section-body
      fc-scrollgrid-section-liquid {
      overflow: hidden;
    }
    button {
      cursor: pointer;
    }
  }
`;
