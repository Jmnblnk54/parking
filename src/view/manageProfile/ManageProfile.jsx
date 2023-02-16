import { Alert, Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import styled from "styled-components";
import CarRegistration from "../../components/carRegistration/CarRegistration";
import Navbar from "../../components/common/navbar/Navbar";
import UploadLicense from "../../components/uploadlicense/UploadLicense";
import fire from "../../config/config";
import { CarRegistrationValidation } from "../../functions/functions";
function ManageProfile() {
  const userId = localStorage.getItem("USERID");
  const uType = localStorage.getItem("User Type");

  const location = useLocation();
  const history = useHistory();
  const [data, setData] = useState({
    make: "",
    model: "",
    year: "",
    carColor: "",
    licenseNumber: "",
    frontLicenseImage: "",
    backLicenseImage: "",
    error: "",
    type: "",
    docId: "",
  });
  console.log(data);
  useEffect(() => {
    console.log("Doc", userId);
    fire
      .firestore()
      .collection("users")
      .where("userId", "==", userId)
      .where("userType", "==", uType)
      .onSnapshot((query) => {
        if (query.size === 0) {
          console.log("NO FOUND");
          console.log("Hassan", uType);
        } else {
          const _docId = query.docs[0].id;
          const _data = query.docs[0].data();
          setData({
            ...data,
            make: _data.vehicleMake,
            model: _data.vehicleModel,
            year: _data.vehicleYear,
            carColor: _data.vehicleColor,
            licenseNumber: _data.LicensePlateNumber,
            frontLicenseImage: _data.frontLicenseImage,
            backLicenseImage: _data.backLicenseImage,
            docId: _docId,
          });
        }
      });
  }, []);

  const handleCarRegistration = () => {
    const response = CarRegistrationValidation(data);
    if (response === "OK") {
      setData({
        ...data,
        error: "",
      });
      fire
        .firestore()
        .collection("users")
        .doc(data?.docId)
        .update({
          vehicleModel: data?.model,
          vehicleYear: data?.year,
          vehicleMake: data?.make,
          vehicleColor: data?.carColor,
          frontLicenseImage: data?.frontLicenseImage,
          backLicenseImage: data?.backLicenseImage,
          LicensePlateNumber: data?.licenseNumber,
        })
        .then(() => {
          setData({
            ...data,
            error: "Updated Successfully",
            type: "success",
          });
        })
        .catch((e) => console.log(e.code));
    } else {
      setData({
        ...data,
        error: response,
        type: "error",
      });
    }
  };
  // console.log(data.year);
  return (
    <>
      <Navbar />
      <Wrapper>
        <div className="header-content-div">
          <div className="header-div">
            <h1>MANAGE VEHICLE</h1>
          </div>
          {data.error ? (
            <Alert message={data.error} type={data.type} closable />
          ) : null}
          <div className="content-div">
            <Row
              style={{ width: "100%", marginTop: "15px" }}
              gutter={[20, 20]}
              align="middle"
              justify="center"
            >
              <Col xs={24} lg={7} style={{ height: "450px" }}>
                <CarRegistration data={data} setData={setData} />
              </Col>

              <Col xs={24} lg={7} style={{ height: "450px" }}>
                {/* <UploadLicense /> */}
                <UploadLicense
                  data={data}
                  setData={setData}
                  handleCarRegistration={handleCarRegistration}
                />
              </Col>
            </Row>
          </div>
        </div>
      </Wrapper>
    </>
  );
}

export default ManageProfile;

const Wrapper = styled.div`
  height: calc(100% -102px);
  /* height: 100%; */
  background-color: rgb(77 157 116 / 7%);
  .header-content-div {
    padding: 30px 50px 50px 50px;
  }
  .header-div {
    h1 {
      font-size: 25px;
    }
  }
`;
