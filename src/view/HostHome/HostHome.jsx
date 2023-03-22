import React from "react";
import styled from "styled-components";

import Footer from "../../components/common/footer/Footer";
import Navbar from "../../components/common/navbar/Navbar";
import Header from "./header/Header";
import Testimonial from "./testimonials/Testimonial";
import UserCard from "./usercard/UserCard";

import background from "../../Assets1/Group2.svg";
import fire from "../../config/config";

export default function HostHome() {
  
  
  return (
    <Wrapper>
      <Navbar transparent />
      <Header />
      <Testimonial />
      <UserCard />
      <Footer />
    </Wrapper>
  );
}
const Wrapper = styled.div`
  background-image: url("${background}");
  background-repeat: no-repeat;
  background-position: 127px 40px;
  background-size: 31%;
  // background-position: 299px 40px;
  // background-size: 28%;

  @media screen and (max-width: 720px) {
    background-image: none;
  }
`;
