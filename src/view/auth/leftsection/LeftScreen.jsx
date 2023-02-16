import React from "react";
import { Wrapper } from "./LeftScreen.styled";
import { useHistory } from "react-router-dom";
import yugoWhite from "../../../assets/icons/yugoWhite.svg";

export default function IndexPage() {
  const history = useHistory();

  return (
    <Wrapper>
      <div className="left-container">
        <h2>
          Lets get
          <span className="logo-btw-heading">
            <img src={yugoWhite} alt="yugoWhite.svg" />
          </span>
          ‘n!
        </h2>
        {history?.location?.pathname.includes("host") ? (
          <>
            <p>
              Enter your details to start your <br />
              hosting journey with us!
            </p>
            <button
              className="signup-button"
              onClick={() => history.push("/host/signup")}
            >
              Sign up
            </button>
          </>
        ) : (
          <>
            <p>
              Enter your details to start reserving <br />
              your spots ahead of time!
            </p>
            <button
              className="signup-button"
              onClick={() => history.push("/traveler/signup")}
            >
              Sign up
            </button>
          </>
        )}
      </div>
    </Wrapper>
  );
}
