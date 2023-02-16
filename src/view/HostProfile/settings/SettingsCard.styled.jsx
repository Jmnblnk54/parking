import styled from "styled-components";

export const Wrapper = styled.div`
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background: #eff0f2;
  .button{
    
  }
  .card {
    padding: 20px;
    background: #fff;
    border-radius: 20px;
    min-width: 40%;

    p {
      color: #79a182;
      font-size: 16px;
    }

    .top {
      display: flex;
      align-items: center;

      h2 {
        color: #080f28;
        font-size: 36px;
        margin: 0px 0px 0px 20px;
      }
    }
    .input {
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
        letter-spacing: 2px;
      }
      .ant-input[type="password"] {
        letter-spacing: 2px;
      }

      .ant-input-affix-wrapper {
        width: 100%;
        padding: 0px;
        border-radius: 5px;
        color: #091028;
        border: none;
        font-weight: 500;
      }
    }
    
    .bottom {
      display: flex;
      justify-content: center;
      margin-top: 10px;

      .button {
        background: #4d9d74;
        padding: 6px 70px;
        border: none;
        border-radius: 30px;
        color: #fff;
        font-size: 16px;
        cursor: pointer;
      }

      .button:hover {
        background: #6db992;
      }
    }
  }
`;
