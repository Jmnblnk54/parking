import React from "react";
import { Wrapper } from "./LeftScreen.styled";
import { useHistory } from "react-router-dom";
import yugoWhite from "../../../assets/icons/yugoWhite.svg";

export default function IndexPage() {
  const history = useHistory();

  return (
    <Wrapper>
        {history?.location?.pathname.includes("host") ? (
          <div className="bg-icon">
            <img className="icon" src="/static/media/house.5f69030ca3bb055477aeff7736e5d384.svg" alt="" />
              <div className="left-container-host">
                    <h2>
                      Lets get
                      <span className="logo-btw-heading">
                        <img src={yugoWhite} alt="yugoWhite.svg" />
                      </span>
                      ‘n!
                    </h2>

                <p>
                  Enter your details to start your <br />
                  HOSTING journey with us!
                </p>
                <button
                  className="signup-button-host"
                  onClick={() => history.push("/host/signup")}
                >
                  Sign up
                </button>
              </div>
          </div>
        ) : (
          <div className="bg-icon">
              <img className="icon-car" src="/static/media/car.b5f95c2f005c9f2cb5c7d4d946bf17fc.svg" alt="" />
            <div className="left-container-traveler">
            <h2>
              Lets get
              <span className="logo-btw-heading">
                <img src={yugoWhite} alt="yugoWhite.svg" />
              </span>
              ‘n!
            </h2>
                <p>
                  Enter your details to start reserving <br />
                  your spots ahead of time!
                </p>
                <button
                  className="signup-button-traveler"
                  onClick={() => history.push("/traveler/signup")}
                >
                  Sign up
                </button>
            </div>
          </div>
        )}
    </Wrapper>
  );
}
