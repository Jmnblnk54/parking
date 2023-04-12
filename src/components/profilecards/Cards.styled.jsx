import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;

  .profile-card {
    border-radius: 20px;
    margin-top: 20px;
    .ant-card-body {
      padding: 10px 20px;
      h1 {
        margin: 0px;
      }
    }
  }

  .profile-card-upcom {
    -webkit-box-shadow: 0px 0px 37px -3px rgba(194,194,194,1);
-moz-box-shadow: 0px 0px 37px -3px rgba(194,194,194,1);
box-shadow: 0px 0px 37px -3px rgba(194,194,194,1);
    height: 100%;
    border-radius: 20px;

    display: flex;
    align-items: center;
    .ant-card-body {
      width: 100%;
      height: 370px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      ::before,
      ::after {
        display: none;
      }

      h1 {
        text-align: center;
      }
      h3 {
        text-align: center;
      }
      .main {
        display: flex;
        align-items: center;
        .image {
          width: 40%;
          height: 100%;
          display: flex;
          justify-content: center;
          img {
            width: 100%;
            object-fit: cover;
            width: 100%;
            height: 200px;
          }
        }
        .details {
          margin-left: 10px;
          h3 {
            margin: 0px;
            font-weight: bold;
          }
          .date {
            border-radius: 5px;
            background: #eff0f2;
            display: flex;
            flex-direction: row;
            padding: 6px;
            width: 165px;
          }
          .green-title {
            margin-top: -3px;
            font-weight: bold;
            color: #4d9d74;
          }
        }
      }
    }
  }

  p {
    margin: 0px;
    margin-top: -5px;
    font-size: 16px;
  }
  button {
    float: right;
    background-color: #4d9d74;
    color: white;
    width: 120px;
    border-radius: 30px;
    border: 0px;
    font-size: 18px;
    text-align: center;
    font-weight: normal;
    padding-top: 3px;
    padding-bottom: 3px;
  }
  @media screen and (max-width: 991px) {
    .profile-card-upcom {
      margin: 0px 0px 20px 0px !important;
      min-height: fit-content;
    }
    .profile-card {
      margin: 0 !important;
    }
  }
`;
