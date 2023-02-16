import React from "react";
import Group100 from "../../../assets/icons/Group100.svg";
import styled from "styled-components";

function ImageUploader({ image }) {
  return (
    <Wrapper>
      <img src={image || Group100} width={150} />
    </Wrapper>
  );
}

export default ImageUploader;

const Wrapper = styled.div`


`