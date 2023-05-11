import { FileImageOutlined } from "@ant-design/icons";
import { Button, Table } from "antd";
import moment from "moment";
import React, { Component, useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import Navbar from "../../components/common/navbar/Navbar";
import fire from "../../config/config";

function HostTransaction() {
  const [showModal, setShowModal] = useState();
  const [transactionsData, setTransactionData] = useState([]);
  useEffect(() => {
    fire
      .firestore()
      .collection("Transactions")
      .where("hostId", "==", localStorage.getItem("USERID"))
      .onSnapshot((data) => {
        let value = [];
        if (data.size === 0) {
          data.docs.forEach((doc) => {
            value.push(doc.data());
          });
          setTransactionData([...value]);
        } else {
          data.docs.forEach((doc) => {
            value.push(doc.data());
          });
          setTransactionData([...value]);
        }
      });
  }, []);

  const columns = [
    {
      title: "Charge Id",
      dataIndex: "chargeId",
      key: "chargeId",
    },
    {
      title: "Traveler Name",
      dataIndex: "travelerName",
      key: "travelerName",
    },
    {
      title: "Traveler Email",
      dataIndex: "travelerEmail",
      key: "travelerEmail",
    },
    {
      title: "Spot Name",
      dataIndex: "spotName",
      key: "spotName",
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "spotName",
      render: (invoice_date) => {
        return (
          <p>{moment.unix(invoice_date).format("MM-DD-YYYY hh:mm:ss A")}</p>
        );
      },
    },
    {
      title: "Receipt",
      dataIndex: "receipt_url",
      key: "receipt_url",
      render: (text) => (
        <Button
          style={{ alignSelf: "center" }}
          onClick={() => window.open(text)}
        >
          <FileImageOutlined />
        </Button>
      ),
    },
  ];

  return (
    <>
      <Navbar />
      <Wrapper>
        <Table
          dataSource={transactionsData}
          columns={columns}
          options={{
            headerStyle: {
              backgroundColor: "#4d9d74",
              color: "#FFF",
            },
          }}
          pagination={{
            defaultPageSize: 5,
          }}
          bordered={true}
          scroll={{
            x: 700,
          }}
        />
      </Wrapper>
    </>
  );
}

export default HostTransaction;

const Wrapper = styled.div`
  margin: 20px;

  .ant-table-thead {
    .ant-table-cell {
      color: white;
      background: #4d9d74 !important;
    }
  }
  .ant-table-cell-row-hover {
    color: white;
    background: #4d9d74bd !important;
  }

  .ant-table-tbody {
    font-size: 1rem;
  }
`;
