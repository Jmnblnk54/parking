import React from "react";
import { Wrapper } from "./SpotNearMe.styled";
import Map from "../../components/map/Map";
import SpotCard from "../../components/spotCard/SpotCard";
import Navbar from "../../components/common/navbar/Navbar";

export default function IndexPage() {
  return (
    <Wrapper>
      <Navbar />
      <div className="spots">
        <div className="spots-container">
          <div>
            <button className="list-button">LIST YOUR SPOT NOW</button>
          </div>
          <div className="heading">
            <h2>parking SPOTS NEAR ME</h2>
          </div>

          <div className="main-sport-card-div">
            <SpotCard />
            <SpotCard />
            <SpotCard />
          </div>
        </div>
        <Map />
      </div>
    </Wrapper>
  );
}
