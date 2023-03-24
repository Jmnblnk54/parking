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
    box-shadow: 0px 5px 32px 0px rgba(214,214,214,1);
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
          width: 100%;
          // max-width: 139px;
          height: 139px;
          display: flex;
          justify-content: center;
          img {
            width: 100%;
            object-fit: cover;
          }
        }
        .details {
          margin-left: 10px;
          width: 100%;
          // font-size: 17px;
          h3 {
            margin: 0px;
            font-weight: bold;
          }
          .date {
            border-radius: 5px;
            display: flex;
            flex-direction: row;
          }
          .green-title {
            margin-top: -3px;
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
  .description-title {
    color: #b9b9b9;
    font-weight: normal;
  }
`;
