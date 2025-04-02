import React from "react";
import Logs from "./tripLogs";
import { Tabs } from "antd";
import ShippingLogs from "./shippingLogs";

const labelStyle = { fontFamily: "Raleway", fontWeight: 600 };
function AllLogs() {
  const onChange = (key) => {
    console.log(key);
  };

  const items = [
    {
      key: "1",
      label: <p style={labelStyle}>Shipping Logs</p>,
      children: <ShippingLogs />,
    },
    {
      key: "2",
      label: <p style={labelStyle}>Trip Logs</p>,
      children: <Logs />,
    },
  ];
  return (
    <>
      <Tabs
        defaultActiveKey="1"
        items={items}
        onChange={onChange}
        style={{
          padding: "10px 10px",
          margin: "20px 20px",
          background: "white",
        }}
      />
    </>
  );
}

export default AllLogs;
