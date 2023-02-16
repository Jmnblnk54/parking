import styled from "styled-components";

export const Wrapper = styled.div`
  ${
    "" /* height: calc(100% - 102px);
  width: 100%; */
  }
`;

export const Div = styled.div`
  background-color: #9c9fa9;
  height: calc(100% - 114px);
  width: 100%;
  display: flex;

  @media only screen and (max-width: 999px) {
    height: calc(100% - 77px);
  }
  @media only screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
  }
`;
