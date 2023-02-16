import styled from "styled-components";

export const Wrapper = styled.div`
  height: 100%;
  width: 50%;
  background: #080f28;
  display: flex;
  justify-content: center;
  align-items: center;

  .left-container {
    width: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;

    span {
      margin: 0px 15px;
    }

    h2 {
      text-align: center;
      color: white;
      font-size: 50px;
      margin-bottom: 10px;
    }
    p {
      color: #fff;
      margin: 0px;
      line-height: 22px;
      font-size: 18px;
      text-align: center;
    }
  }

  .signup-button {
    background: #4d9d74;
    padding: 6px 30px;
    width: 60%;
    border: 1px solid #080f28;
    border-radius: 30px;
    color: #fff;
    margin-top: 20px;
    font-size: 16px;
    cursor: pointer;
  }

  .signup-button:hover {
    background: #6db992;
  }
  @media screen and (max-width: 900px) {
    .left-container {
      h2 {
        font-size: 30px;
        img {
          width: 30%;
        }
      }
      p {
        font-size: 15px;
      }
      .signup-button {
        font-size: 14px;
      }
    }
  }
  @media screen and (max-width: 720px) {
    width: 100%;
  }
`;
