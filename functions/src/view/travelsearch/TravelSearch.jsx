import React, { useEffect, useState } from "react";

import { message } from "antd";
import moment from "moment";
import "react-activity/dist/Bounce.css";
import { useHistory, useLocation } from "react-router";
import Navbar from "../../components/common/navbar/Navbar";
import TravellerSearchBar from "../../components/travel/TravellerSearchBar";
import TravelSpot from "../../components/travel/TravelSpot";
import fire from "../../config/config";
import {
  computeDestinationPoint,
  getCenter,
  isPointWithinRadius,
  orderByDistance,
} from "geolib";

function Travel() {
  const history = useHistory();
  const location = useLocation();

  let price = "";
  const auth = localStorage.getItem("Auth Token");
  const userType = localStorage.getItem("User Type");
  const [error, setError] = useState(1);
  const [data, setData] = useState([]);
  const [temp, setTemp] = useState([]);
  const [LocationSearch, setLocationSearch] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startTime, setStartTime] = useState(
    moment()
      .add(2, "hours")
      .subtract(Number(moment().format("mm"), "minutes"), "minutes")
      .toLocaleString()
  );
  const [endTime, setEndTime] = useState("");
  const [startDateTime, setStartDateTime] = useState("");
  const [endDateTime, setEndDateTime] = useState("");
  const [loader, setLoader] = useState(false);
  const [duration, setDuration] = React.useState("");
  const [centerCoords, setCenterCoords] = React.useState();
  const [locationCoords, setLocationCoords] = React.useState({
    latitude: "",
    longitude: "",
  });

  const handleDuration = (event, newDuration) => {
    if (newDuration !== null) {
      setDuration(newDuration);
    }
  };
  console.log("duration", duration);
  useEffect(() => {
    setDuration(location?.state?.spotType);
    setLocationSearch(location?.state?.spotAddress);

    if (location?.state?.searchedBy === "searchbyaddress") {
      setLocationCoords({
        latitude: Number(location?.state?.locationDetails?.latitude),
        longitude: Number(location?.state?.locationDetails?.longitude),
      });
    } else if (location?.state?.searchedBy === "searchbyuser") {
      setLocationCoords({
        latitude: Number(location?.state?.userLocation?.latitude),
        longitude: Number(location?.state?.userLocation?.longitude),
      });
    }
  }, []);

  useEffect(() => {
    getData();
  }, [LocationSearch, duration]);

  const getData = () => {
    setLoader(false);

    fire
      .firestore()
      .collection("spots")
      .where("spotType", "==", duration)
      .where("status", "==", "Approved")
      .onSnapshot((query) => {
        console.log(query);
        if (query.size === 0) {
          setLoader(true);
          setTemp([]);
          setError(query.size);
        } else {
          const db = [];
          query.docs.forEach((doc) => {
            if (doc.data().noOfSpot > 0) {
              db.push(doc.data());
            }
          });
          setTemp([...db]);
        }
      });
  };

  useEffect(() => {
    console.log(locationCoords);
    if (temp != []) {
      const db = [];
      const coordsArray = [];
      coordsArray.push({
        latitude: locationCoords.latitude,
        longitude: locationCoords.longitude,
      });
      temp?.map((arr) => {
        console.log(Number(arr?.latitude), Number(arr?.longitude));
        const result = isPointWithinRadius(
          {
            latitude: Number(arr?.latitude),
            longitude: Number(arr?.longitude),
          },
          {
            latitude: locationCoords.latitude,
            longitude: locationCoords.longitude,
          },
          15000
        );
        if (result == true) {
          db.push(arr);
          coordsArray.push({
            latitude: Number(arr?.latitude),
            longitude: Number(arr?.longitude),
          });
        }
        console.log(result);
      });
      setData([...db]);
      const centerCoords_ = getCenter(coordsArray);
      setCenterCoords(centerCoords_);
      console.log(centerCoords_);
    }
    setLoader(true);
  }, [temp]);

  useEffect(() => {
    setStartDate("");
    setEndDate("");
    setStartTime("");
    setEndTime("");
    setStartDateTime("");
    setEndDateTime("");
  }, [duration]);

  useEffect(() => {
    if (startDate != "" && endDate != "") {
      if (duration == "Half Day") {
        if (startTime == "" && endTime == "") {
          setStartDateTime(
            moment(startDate, `MM-DD-YYYY hh:mm a`)
              .format(`MM-DD-YYYY HH:mm`)
              .toLocaleString()
          );
          setEndDateTime(
            moment(endDate, `MM-DD-YYYY hh:mm a`)
              .format(`MM-DD-YYYY HH:mm`)
              .toLocaleString()
          );
        } else {
          setStartDateTime(
            moment(startDate + " " + startTime, `MM-DD-YYYY hh:mm a`)
              .format(`MM-DD-YYYY HH:mm`)
              .toLocaleString()
          );
          setEndDateTime(
            moment(endDate + " " + endTime, `MM-DD-YYYY hh:mm a`)
              .format(`MM-DD-YYYY HH:mm`)
              .toLocaleString()
          );
        }
      } else {
        setStartDateTime(
          moment(startDate, `MM-DD-YYYY hh:mm a`)
            .format(`MM-DD-YYYY HH:mm`)
            .toLocaleString()
        );
        setEndDateTime(
          moment(endDate, `MM-DD-YYYY hh:mm a`)
            .format(`MM-DD-YYYY HH:mm`)
            .toLocaleString()
        );
      }
    }
  }, [startDate, endDate, startTime, endTime]);

  const onBooked = (spotId, price) => {
    if (!auth && userType === null) {
      history.push("/traveler/Login");
    } else {
      if (startDateTime === "" || endDateTime === "") {
        message.error(
          {
            content: "Start and End Date Required",
            className: "custom-class",
            style: {
              marginTop: "10vh",
            },
          },
          1.5
        );
      } else {
        if (duration == "HalfDay" && (startTime === "" || endTime === "")) {
          message.error(
            {
              content: "Start and End Time Required",
              className: "custom-class",
              style: {
                marginTop: "10vh",
              },
            },
            1.5
          );
        } else {
          const today = moment().format("MM-DD-YYYY HH:mm").toLocaleString();

          if (moment(today).unix() >= moment(startDateTime).unix()) {
            message.error("Please select The Future Date");
          } else {
            const hour = moment(endDateTime, "MM-DD-YYYY HH:mm")
              .diff(moment(startDateTime, "MM-DD-YYYY HH:mm"), "hour")
              .toLocaleString();

            if (hour === 0 || hour === 1) {
              message.error("Reservation Must be greater than 1 Hour", 1.5);
            } else {
              const noOfDays = parseInt(parseFloat(hour / 24));
              console.log(hour, noOfDays, duration);

              if (duration === "Half Day") {
                history.push("/traveler/Booking", {
                  serviceFees: parseInt(hour) * parseInt(price) * 0.08,
                  totalPrice: parseInt(hour) * parseInt(price),
                  spotId: spotId,
                  spotType: duration,
                  startDate: startDateTime,
                  endDate: endDateTime,
                  days: "Hour" + "\t" + hour,
                  price: price,
                });
              } else if (noOfDays >= 1 && duration !== "Half Day") {
                history.push("/traveler/Booking", {
                  serviceFees: parseInt(noOfDays) * parseInt(price) * 0.08,
                  totalPrice: parseInt(noOfDays) * parseInt(price),
                  spotId: spotId,
                  spotType: duration,
                  startDate: startDateTime,
                  endDate: endDateTime,
                  days: noOfDays,
                  price: price,
                });
              } else {
                message.error("Please Select the Valid Value", 1);
              }
            }
          }
        }
      }
    }
  };

  return (
    <>
      <Navbar />
      <TravellerSearchBar
        endDate={endDate}
        setEndDate={setEndDate}
        startDate={startDate}
        setStartDate={setStartDate}
        startTime={startTime}
        setStartTime={setStartTime}
        endTime={endTime}
        setEndTime={setEndTime}
        startDateTime={startDateTime}
        LocationSearch={LocationSearch}
        setLocationSearch={setLocationSearch}
        duration={duration}
        setLocationCoords={setLocationCoords}
      />

      <TravelSpot
        loader={loader}
        data={data}
        spotType={duration}
        onBooked={onBooked}
        setLocationSearch={setLocationSearch}
        LocationSearch={LocationSearch}
        locationData={location?.state?.locationDetails}
        endDate={endDate}
        setEndDate={setEndDate}
        startDate={startDate}
        setStartDate={setStartDate}
        duration={duration}
        handleDuration={handleDuration}
        centerCoords={centerCoords}
        locationCoords={locationCoords}
        setLocationCoords={setLocationCoords}
      />
    </>
  );
}

export default Travel;
