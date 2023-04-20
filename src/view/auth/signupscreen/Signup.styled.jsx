import styled from "styled-components";

export const Wrapper = styled.div`
  height: 100%;
  background: #eff0f2;

  .top {
    display: flex;
    align-items: center;
    h2 {
      color: #080f28;
      font-size: 36px;
      margin: 0px 0px 0px 20px;
    }
  }

  .signup-container {
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: center;
    align-items: center;
    background: #4d9d74;
  }

  .bodyContent {
    padding: 20px;
    background: #fff;
    border-radius: 20px;
    min-width: 40%;

    p {
      color: #79a182;
      font-size: 16px;
    }
  }

  .inputField {
    width: 100%;
    margin-bottom: 10px;
    border-bottom: 1px solid #091028;
    .PhoneInput {
      width: 100%;
      padding: 10px;
      border-radius: 5px;
      color: #091028;
      border: none;
      font-size: 14px;
      font-weight: 500;

      .PhoneInputInput {
        border: none;
      }
    }
    .PhoneInput--focus {
      .PhoneInputInput {
        border: none;
        outline: none;
      }
    }
  }

  .ant-input-affix-wrapper,
  .ant-input:focus {
    box-shadow: none;
  }

  .ant-input {
    width: 100%;
    padding: 10px;
    border-radius: 5px;
    color: #091028 !important;
    font-weight: 500;
    border: none;
    outline: none;
    font-family: Arciform;
  }
  .ant-input[type="password"] {
    font-family: Verdana;
    letter-spacing: 0.1em;
  }

  .ant-input-affix-wrapper {
    width: 100%;
    padding: 10px;
    border-radius: 5px;
    color: #091028;
    border: none;
    font-weight: 500;
  }

  .bottomSection {
    display: flex;
    align-items: center;
    font-size: 16px;
    margin-bottom: 20px;
    p {
      color: #091028;
      margin: 0px;
      margin-left: 10px;
    }
  }

  .signin {
    display: flex;
    justify-content: center;
    margin-top: 10px;
  }

  .signin-button {
    background: #4d9d74;
    padding: 6px 70px;
    border: none;
    border-radius: 30px;
    color: #fff;
    font-size: 16px;
    cursor: pointer;
  }

  .signin-button:hover {
    background: #6db992;
  }
  .spinner {
    position: fixed;
    width: 100%;
    height: 100%;
    /* top: 50%; */
    background: white;
    display: flex;
    top: 0;
    left: 0;
    align-items: center;
    justify-content: center;
    background: transparent;
    backdrop-filter: grayscale(1);
  }
`;
