import styled from "styled-components";

export const Wrapper = styled.div`
  background-color: rgba(77, 157, 116, 0.2);

  .CreditCardInput {
    border: 1px solid rgba(77, 157, 116, 0.2);
  }
  .title {
    padding: 15px 20px 0px 20px;
    margin: 0px;
  }
  .main {
    display: flex;
    flex-direction: column;
    align-items: center;
    h1 {
      margin-bottom: 15px;
      font-size: 100px;
      color: #4d9d74;
      line-height: 0.7;
    }
    h2 {
      font-size: 28px;
      font-weight: normal;
    }
    h3 {
      font-weight: bold;
      margin: 0px;
      line-height: 10px;
      margin-top: 5px;
    }
    label {
      color: #8c8c8c;
    }

    .mid,
    .bot {
      padding-top: 10px;
    }
    .card {
      background-color: rgba(77, 157, 116, 0.2);
      text-align: center;
      border-radius: 20px;
      text-align: center;

      width: 270px;
    }
    .mid {
      display: flex;

      .card-white {
        background-color: white;
        width: 220px;
        cursor: pointer;
        .ant-card-body {
          padding-bottom: 10px;
        }
        :hover {
          border: 1px solid #acacac;
          transition: all 0.5s ease-in;
        }
      }
      .card-active {
        border: 1px solid #444444;
        :hover {
          border: 1px solid #444444;
        }
      }
    }
    .bot {
      display: flex;
      flex-direction: column;
      width: 520px;

      .fees {
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid black;
      }
    }
    .btn {
      width: 270px;
      margin: 20px 0px;

      display: flex;
      justify-content: center;
      align-items: center;

      border: none;
      border-radius: 20px;
      font-size: 28px;

      background: #4d9d74;
      color: white;
      :hover {
        background: #6db992;
      }
      :focus-visible {
        outline: none;
      }
    }
  }
  @media screen and (max-width: 999px) {
  }
  @media screen and (max-width: 720px) {
    padding: 20px;
    .title {
      padding: 0px;
      position: relative;
      text-align: center;
    }
    .top,
    .mid,
    .bot {
      padding-top: 15px !important;
    }
    .btn {
      margin-top: 15px !important;
      width: 100% !important;
    }
    .top {
      width: 100%;

      display: flex;
      justify-content: center;

      .card {
        width: 100%;
      }
    }
    .mid {
      width: 100%;
      justify-content: center;
      height: 145px;

      .card-white {
        width: 100% !important;
        .ant-card-body {
          padding: 10px;
        }
      }
    }
    .bot {
      width: 100% !important;
    }
  }
`;
