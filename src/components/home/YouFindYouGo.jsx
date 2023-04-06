import { Menu, Select } from "antd";
import React, { useEffect } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";

import { Dropdown, Input } from "antd";
import { useGeolocated } from "react-geolocated";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import Group94 from "../../assets/Group94.png";
import map from "../../Assets1/map.png";
import LocationButton from "../common/locationbutton/LocationButton";
import { useState } from "react";
import { NavigateBefore } from "@mui/icons-material";
const { Option } = Select;

export default function YouFindYouGo(props) {
  const value = "Huston USA";
  const history = useHistory();

  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: false,
      },
      userDecisionTimeout: 5000,
    });

  const suffix = (
    <img
      src={Group94}
      style={{
        width: "20px",
        color: "black",
      }}
      alt=""
    />
  );

  useEffect(() => {
    // if ("geolocation" in navigator) {
    //   navigator.geolocation.getCurrentPosition(
    //     function (position) {
    //       // Do stuff with the geo data...
    //     },
    //     function (error) {
    //       // I always end up here on iOS Safari.
    //       alert(error.code + ": " + error.message);
    //     }
    //   );
    // } else {
    //   alert("Location is unavailable in this browser.");
    // }

    if (!isGeolocationAvailable) {
    } else if (!isGeolocationEnabled) {
    } else if (coords) {
      props.setUserLocation({
        ...props.userLocation,
        latitude: coords.latitude,
        longitude: coords.longitude,
      });
    }
  }, [coords]);

  React.useState(() => {
    geocodeByAddress(props.addressSearchByTraveler)
      .then((results) => {
        getLatLng(results[0])
          .then((latLng) => {
            props.setLocationData({
              ...props.locationData,
              latitude: latLng?.lat,
              longitude: latLng?.lng,
            });
            // console.log(latLng?.lng, latLng?.lat);
          })
          .catch((error) => console.error("Error", error));
      })
      .catch((error) => console.error("Error", error));
  }, [props.addressSearchByTraveler]);

  const handleChange = (address) => {
    props.setaddressSearchByTraveler(address);
  };

  const handleSelect = (address) => {
    geocodeByAddress(address)
      .then((results) => {
        getLatLng(results[0])
          .then((latLng) => {
            props.setaddressSearchByTraveler(address);
            props.setLocationData({
              ...props.locationData,
              latitude: latLng?.lat,
              longitude: latLng?.lng,
            });
            // console.log(latLng?.lng, latLng?.lat);
          })
          .catch((error) => console.error("Error", error));
      })
      .catch((error) => console.error("Error", error));
  };

  return (
    <Wrapper>
      <img className="bg-img" src={map} alt="" />

      <div className="main">
        <div className="title">YOU FIND,&nbsp;YOU GO,&nbsp;YOU PARK.</div>

        <div className="header-nav">
          <Menu
            mode="horizontal"
            className="header-nav"
            disabledOverflow
            style={{
              background: "transparent",
              border: "none",
              display: "block",
              fontSize:"20px"
            }}
            // onClick={() => console.log("ALI")}
          >
            <Menu.Item onClick={() => props.setSpotType("Half Day")}>
              HOURLY&nbsp;
            </Menu.Item>
            <Menu.Item onClick={() => props.setSpotType("Daily")}>
              DAILY&nbsp;
            </Menu.Item>
            <Menu.Item onClick={() => props.setSpotType("Weekly")}>
              WEEKLY&nbsp;
            </Menu.Item>
            <Menu.Item onClick={() => props.setSpotType("Monthly")}>
              MONTHLY&nbsp;
            </Menu.Item>
          </Menu>
        </div>

        <div class="hero-search-bar">
          <PlacesAutocomplete
            value={props.addressSearchByTraveler}
            onChange={(e) => handleChange(e)}
            onSelect={(e) => handleSelect(e)}
          >
            {({
              getInputProps,
              suggestions,
              getSuggestionItemProps,
              loading,
            }) => {
              return (
                <Dropdown
                  overlayClassName="search-dd"
                  key="dropdown"
                  placement="bottom"
                  visible={true}
                  overlay={
                    suggestions.length > 0 ? (
                      <Menu className="autocomplete-dropdown-container">
                        {loading}
                        {suggestions.map((suggestion, key) => {
                          const className = suggestion.active
                            ? "suggestion-item--active"
                            : "suggestion-item";
                          return (
                            <Menu.Item
                              className={className}
                              key={key}
                              onClick={(event) => {
                                getSuggestionItemProps(suggestion).onClick(
                                  event
                                );
                              }}
                              onMouseDown={(event) => {
                                getSuggestionItemProps(suggestion).onMouseDown(
                                  event
                                );
                              }}
                              onTouchEnd={(event) => {
                                getSuggestionItemProps(suggestion).onTouchEnd(
                                  event
                                );
                              }}
                              onTouchStart={(event) => {
                                getSuggestionItemProps(suggestion).onTouchStart(
                                  event
                                );
                              }}
                              role="option"
                            >
                              {suggestion.description.substring(0, 50)}
                              {suggestion.description.length > 50 && "..."}
                            </Menu.Item>
                          );
                        })}
                      </Menu>
                    ) : (
                      <></>
                    )
                  }
                >
                  <Input
                    {...getInputProps({
                      className: "location-search-input",
                      name: "address",
                      placeholder: "where are you going ?",
                      size: "large",
                    })}
                    value={props.addressSearchByTraveler}
                    onKeyDownCapture={(e) => {
                      if (e.key == "Enter") {
                        props.handleMethod();
                      }
                    }}
                  />
                </Dropdown>
              );
            }}
          </PlacesAutocomplete>
          <img
            src={Group94}
            style={{
              position: "absolute",
              right: "10px",
              top: "10px",
              width: "20px",
              color: "black",
              cursor: "pointer",
              background: "white",
            }}
            alt=""
            onClick={() => props.handleMethod()}
          />
            <div className="my-location">
             <LocationButton onPress={props.useMyLocation} />
           </div>
        </div>
        {/* {!isGeolocationAvailable
          ? "Value"
          : !isGeolocationEnabled
          ? "eolocation is not enabled"
          : coords
          ? coords.latitude + "\n" + coords.longitude
          : "Getting the location data&hellip;"} */}
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: calc(100vh - 200px);
  color: white;
  .bg-img {
    position: absolute;
    z-index: -1;
    width: 100%;
    height: inherit;
    object-fit: cover;
  }
  .hero-search-bar {
    width: 100%;
    position: relative;
    margin-top: 10px;
    max-width: 1000px;
  }

  .hero-search-bar input {
    border-radius: 6px;
  }
  .main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    padding: 0px 220px;
    color: white;
    backdrop-filter: brightness(0.6);
    .title {
      color: white;
      font-size: 40px;
      font-weight: 500;
    }
    .ant-menu-title-content {
      color: white;
    }
    .ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-item:hover::after,
    .ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-submenu:hover::after,
    .ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-item-active::after,
    .ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-submenu-active::after,
    .ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-item-open::after,
    .ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-submenu-open::after,
    .ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-item-selected::after,
    .ant-menu-horizontal:not(.ant-menu-dark)
      > .ant-menu-submenu-selected::after {
      border-bottom: 2px solid white;
    }
    .my-location {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      width: 100%;
      height: 75px;
    }
    .css-2b097c-container {
      width: 100%;
    }
    .input {
      box-shadow: none;
      border: none;
      border-radius: 10px;
      width: 100%;
      padding: 10px 15px;
      color: black;
      border: 1px solid transparent;
      :focus-visible {
        outline: none;
        box-shadow: 0 0 5pt 1pt #b2fed7;
        border: 1px solid #b2fed8;
      }
    }
    .css-26l3qy-menu {
      color: black;
    }
  }
  .responsive-header-nav {
    display: none;
  }
  .header-nav {
    display: block;
    width: 100%;
    text-align: center;
  }

  @media screen and (max-width: 999px) {
    .main {
      padding: 0px 150px;
    }
    .title {
      font-size: 19px !important;
      text-align: center;
    }
  }
  @media screen and (max-width: 720px) {
    height: calc(100% - 97px);

    .main {
      padding: 0px 10px;
      height: 100%;

      .title {
        font-size: 25px !important;
        text-align: center;
      }

      .css-2b097c-container {
        padding: 0px 25px;
      }
    }

    .ant-menu {
      text-align: center;
    }
    .responsive-header-nav {
      display: block;
      .ant-select-selector {
        border-radius: 30px;
      }
      .ant-select-arrow {
        padding-right: 20px;
      }
    }
    .anticon svg {
      vertical-align: sub;
      margin-left: 10px;
    }
    /* .main .header-nav {
      display: none;
    } */
    .header-nav {
      .ant-menu {
        .ant-menu-item {
          padding: 0 15px;
        }
      }
    }
  }
`;
