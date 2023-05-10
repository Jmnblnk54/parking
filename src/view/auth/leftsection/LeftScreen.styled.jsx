import styled from "styled-components";

export const Wrapper = styled.div`
  height: 100%;
  width: 50%;

  .left-container-host {
    background: rgba(77,157,116,0.2);
    height: 100%;
    width: 90%;
    display: flex;
    flex-direction: column;
    justify-content: center;
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

  .host-bg-icon {
    height: 100%;
    z-index: 1;
    position: relative;
    overflow: hidden;
  }

  .host-icon {
    position: absolute;
    z-index: -1;
    height: 600px;
    left: -140px;
    bottom: -41px;
    opacity: 10%;
  }

  .signup-button-host {
    background: #080F28;
    padding: 6px 30px;
    width: 60%;
    border: 1px solid #080f28;
    border-radius: 30px;
    color: #fff;
    margin-top: 20px;
    font-size: 1rem;
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
