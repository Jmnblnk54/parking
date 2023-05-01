import React, { useState } from "react";
import styledComponents from "styled-components";
import { message, Rate } from "antd";
import milesIcon from "../../assets/icons/milesIcon.svg";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import userEvent from "@testing-library/user-event";
import TravelSpotDetials from "./../travel/details/TravelSpotDetails";
import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import { HeartBroken } from "@mui/icons-material";
import fire from "../../config/config";
import styled from "styled-components";

function SpotCard(props) {
  const userId = localStorage.getItem("USERID");
  const history = useHistory();
  const [visible, setVisible] = useState(false);
  const [fav, setFav] = useState(false);
  const [favId, setFavId] = useState("");

  React.useEffect(() => {
    fire
      .firestore()
      .collection("Favorite")
      .where("travelerId", "==", userId)
      .where("spotId", "==", props.data?.spotId)
      .get()
      .then((e) => {
        if (e.docs.length == 0) {
          setFavId("");
          setFav(false);
        } else {
          setFav(true);
          setFavId(e.docs[0].id);
        }
      })
      .catch((e) => console.log(e));
  }, []);

  const addFav = (data) => {
    const id = fire.firestore().collection("Favorite").doc().id;
    
    fire
      .firestore()
      .collection("Favorite")
      .doc(id)
      .set({
        hostId: data?.hostId,
        travelerId: localStorage.getItem("USERID"),
        spotData: data,
        spotId: data?.spotId,
        refId: id,
      })
      .then(() => {
        setFav(true);
        setFavId(id);
        message.destroy();
        message.success("Added in favourites", 1);
      });
  };

  const removeFav = () => {
    fire
      .firestore()
      .collection("Favorite")
      .doc(favId)
      .delete()
      .then((e) => {
        setFav(false);
        setFavId(false);
        message.destroy();
        message.error("Removed from favourites", 1);
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
                src={props.data?.secondImageUrl}
                alt="spotImage.svg"
              />
            </div>

            <div className="center-details">
              <h3>{props.locationName}</h3>
              {/* <div className="miles">
                <img src={milesIcon} alt="milesIcon.svg" />
                {props.miles} miles
              </div> */}
              <div className="rating">
                <Rate disabled defaultValue={3} value={props.rating} />
              </div>
              <div className="rating" style={{ cursor: "pointer" }}>
                {fav != "" ? (
                  <HeartFilled
                    style={{ color: "#4d9d74" }}
                    onClick={removeFav}
                  />
                ) : (
                  <HeartOutlined
                    style={{ color: "#4d9d74" }}
                    onClick={() => addFav(props?.data)}
                  />
                )}
              </div>
            </div>
          </div>

          <div className="right-details">
            <div className="amount">$ {props.rate}</div>
            <div className="buttons">
              <div
                className="details-button"
                onClick={() => {
                  props.setSpotId({
                    ...props.sId,
                    spotId: props.spotId,
                    price: props.rate,
                  });
                  props.setShowDetails(!props.showDetails);
                }}
              >
                details
              </div>
              <button
                className="book-now-button"
                onClick={() => props.onBooked(props.spotId, props.rate)}
              >
                BOOK NOW
              </button>
            </div>
          </div>
        </div>
      </>
    </Wrapper>
  );
}

export default SpotCard;

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
      font-size: 1rem;
    }
    .details-button {
      font-size: 10px;
    }
  }
`;
