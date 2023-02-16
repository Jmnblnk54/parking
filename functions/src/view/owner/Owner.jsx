import React from "react";
import { useHistory } from "react-router";
import map from "../../assets/images/map-image.png";
import fire from "../../config/config";
import { Wrapper } from "./Owner.styled";
export default function IndexPage() {
  const history = useHistory();
  const Handle = async () => {
 
  };
  return (
    <Wrapper>
      <div className="owner-container">
        <div className="owner-box">
          <div className="heading">
            <h2>CHOOSE ONE</h2>
          </div>
          <button
            className="owner-button"
            onClick={() => history.push("/host/listing")}
          >
            HOME OWNER
          </button>
          <div>or</div>
          <button className="owner-button" onClick={() => Handle()}>
            {" "}
            LOT OWNER
          </button>
        </div>
      </div>
      <img src={map} alt="" />
    </Wrapper>
  );
}
