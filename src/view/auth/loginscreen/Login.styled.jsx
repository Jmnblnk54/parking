import styled from "styled-components";

export const Wrapper = styled.div`
  height: calc(100% - 111px);

  .main {
    background: #eff0f2;
    display: flex;
    height: 100%;
  }
  .loginMain {
    padding: 20px 30px 20px 30px;
    width: 50%;
  }
  .bodyContent {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    h2 {
      color: #080f28;
      font-size: 36px;
      margin: 0px;
    }
  }
  .login-options {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: white;
    width: 75%;
    height: auto;
    padding: 10px;
    margin: 10px 0px;
  }

  button {
    margin-bottom: 10px !important;
  }

  .email-button:hover {
    background: #e93e3e !important;
  }

  .anticon svg {
    color: #fff;
  }

  .forgotPassword {
    font-size: 18px;
    color: #080f28;
    cursor: pointer;
  }

  .signin-button {
    background: #4d9d74;
    padding: 6px 30px;
    border: none;
    border-radius: 30px;
    color: #fff;
    font-size: 1rem;
    cursor: pointer;
  }

  .signin-button:hover {
    background: #6db992;
  }
  @media screen and (max-width: 999px) {
    height: calc(100% - 97px);
    .loginMain {
      h2 {
        font-size: 30px;
      }
    }
  }
  @media screen and (max-width: 720px) {
    height: calc(100% - 97px);
    .main {
      flex-direction: column;
      height: fit-content;

      min-height: fit-content;
    }
    .loginMain {
      width: 100%;
      height: 60vh;
    }
  }
`;
