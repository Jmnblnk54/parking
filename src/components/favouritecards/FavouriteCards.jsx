import React from "react";
import styled from "styled-components";
import { message, Popconfirm, Rate } from "antd";
import milesIcon from "../../assets/icons/milesIcon.svg";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import userEvent from "@testing-library/user-event";
import deleteIcon from "../../assets/Group81.svg";
import fire from "../../config/config";

function FavouriteCards(props) {
  const auth = localStorage.getItem("Auth Token");
  const userType = localStorage.getItem("User Type");
  const history = useHistory();

  const deleteFavorite = (id) => {
    console.log(id);
    fire
      .firestore()
      .collection("Favorite")
      .doc(id)
      .delete()
      .then((e) => {
        console.log(e);
        message.success("Delete Favorite Spot Successfull", 0.5);
      })
      .catch((e) => console.log(e));
  };

  return (
    <Wrapper>
      <>
        <div className="spot-card-container">
          <div className="left">
            <div className="spot-image">
              <img
                style={{
                  width: 150,
                  height: 150,
                  borderRadius: 30,
                  objectFit: "cover",
                }}
                src={props.image}
                alt="spotImage.svg"
              />
            </div>

            <div className="center-details">
              <h3>{props.Name}</h3>
              <div className="miles">
                <img src={milesIcon} alt="milesIcon.svg" />
                {props.locationName}
              </div>
              <div className="rating">
                <Rate
                  disabled
                  defaultValue={props.rating}
                  value={props.rating}
                />
              </div>
            </div>
          </div>

          <div className="right-details">
            <div className="amount">$ {props.price}</div>
            <div className="buttons">
              <Popconfirm
                onConfirm={() => deleteFavorite(props.id)}
                title="You want to delete this Favorite Spot?"
              >
                <img
                  src={deleteIcon}
                  width="22px"
                  style={{ cursor: "pointer" }}
                />
              </Popconfirm>
            </div>
          </div>
        </div>
      </>
    </Wrapper>
  );
}

export default FavouriteCards;

const Wrapper = styled.div`
  margin-bottom: 10px;

  .spot-card-container {
    background: #fff;
    border-radius: 15px;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
  }

  .left {
    display: flex;
    align-items: center;
  }

  .ant-rate {
    color: #4d9d74;
    font-size: 12px;
    li {
      margin-right: 4px;
    }
  }

  .center-details {
    margin-left: 10px;
    h3 {
      margin: 0px;
      font-weight: bold;
    }
    .miles {
      margin-top: -3px;
      font-weight: bold;
    }
    .rating {
      margin-top: -3px;
    }
  }

  .right-details {
    display: flex;
    flex-direction: column;
    align-items: end;
    position: absolute;
    right: 10px;
    bottom: 10px;
  }

  .buttons {
    display: flex;
    align-items: end;
  }
  .amount {
    font-size: 22px;
    font-weight: bold;
    padding: 0px 15px;
    line-height: 26px;
  }

  .details-button {
    border: none;
    border-radius: 20px;
    color: black;
    font-size: 14px;
    cursor: pointer;
    margin-right: 5px;
    text-decoration: underline;
  }

  .book-now-button {
    background: #4d9d74;
    padding: 4px 15px;
    border: none;
    border-radius: 20px;
    color: #fff;
    font-size: 1rem;
    cursor: pointer;
    margin-left: 5px;
  }

  .book-now-button:hover {
    background: #6db992;
  }

  @media screen and (max-width: 900px) {
    .spot-card-container {
      display: flex;
      flex-direction: column;
      align-items: inherit;
    }
    .left {
      width: 100%;
    }
    .spot-card-container {
      position: relative;
    }
    .right-details {
      position: absolute;
      right: 10px;
      bottom: 10px;
      .amount {
        font-size: 17px;
        line-height: 15px;
        padding: 2px 10px;
      }
    }
    .spot-image {
      img {
        width: 100px !important;
        height: 100px !important;
        object-fit: cover;
      }
    }
    .book-now-button {
      padding: 3px 10px;
      font-size: 10px;
    }
    .details-button {
      font-size: 10px;
    }
  }
`;
