import { Modal } from "antd";
import React from "react";
import { ArrowLeftOutlined } from "@ant-design/icons";
import "./GMapModal.css";
import MapImage from "../../assets/images/MobileMap.png";

function GMapModal({ showModal, setShowModal, handleURL }) {
  const handleCancel = () => {
    setShowModal(false);
  };
  return (
    <Modal
      className="gmap-modal"
      visible={showModal}
      closable={false}
      footer={false}
    >
      <div className="top">
        <ArrowLeftOutlined onClick={handleCancel} />
      </div>
      <div className="middle">
        <h2>Get the Google Maps App to continue</h2>
        <img src={MapImage} height="200px" />
      </div>

      <div className="bottom">
        <button className="modal-button" onClick={handleURL}>
          Continue
        </button>
      </div>
    </Modal>
  );
}

export default GMapModal;
