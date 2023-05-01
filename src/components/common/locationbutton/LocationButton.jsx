import React from "react";
import { useHistory } from "react-router";
import styled from "styled-components";

import location from "../../../assets/icons/location.svg";

function LocationButton(props) {
  const history = useHistory();
  const type = localStorage.getItem("User Type");
  return (
    <Wrapper
      className="location"
      style={props.margin ? { marginTop: "10px" } : null}
      onClick={() => props.onPress()}
    >
      {/* <div className='button' onClick={()=>history.push("/search")}> */}
      <label>use my location</label>
      <img src={location} alt="" />
      {/* </div> */}
    </Wrapper>
  );
}

export default LocationButton;

const Wrapper = styled.button`
border: none;
  display: flex;
  background: #4d9d74;
  color: white;
  min-width: 140px;
  height: 35px;
  justify-content: space-between;
  align-items: center;
  border-radius: 25px;
  padding: 0px 10px;
  cursor: pointer;

  img {
    width: 10px;
  }
  label {
    cursor: pointer;
    font-size: 1rem;
  }
`;
