import React from "react";
import styled from "styled-components";
import ProfileCard from "../../../components/profileCard/ProfileCard";

function profile() {
  return (
    <Wrapper>
      <ProfileCard
        Name={"Furqan Aslam"}
        Email={"furqan.aslam27@gmail.com"}
        Gender={"Male"}
        MemberSince={"04 Mar 2021"}
        Status={"Guppy"}
        Likes={200}
        Followers={"1K"}
      />
    </Wrapper>
  );
}

export default profile;

const Wrapper = styled.div``;
