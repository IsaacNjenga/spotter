import { Button, Typography } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import "../assets/css/home.css";
import LogsToday from "../components/logsToday";
import UseTodaysLog from "../assets/hooks/useTodaysLog";
import ShippingLogToday from "../components/shippingLogToday";
import UseShippingLogs from "../assets/hooks/useShippingLogs";

const { Title, Text } = Typography;

function Home() {
  const { log } = UseTodaysLog();
  const { shippingLog } = UseShippingLogs();

  return (
    <>
      <div className="home-bg">
        {shippingLog.length > 0 ? (
          <div style={{ margin: "0px 20px", padding: "0px 20px" }}>
            <ShippingLogToday />
          </div>
        ) : (
          <div
            style={{
              background: "rgba(255, 255, 255, 0.23)",
              display: "flex",
              margin: "0px 10px",
              borderRadius: "12px",
              maxWidth: "550px",
              padding: "20px 30px",
              flexDirection: "left",
            }}
          >
            <Text
              style={{
                fontFamily: "Roboto",
                fontSize: "1.2rem",
                color: "whitesmoke",
                textAlign: "left",
              }}
            >
              Looks like you haven't logged in your shipping log today.{" "}
            </Text>
            <Button
              type="primary"
              style={{
                marginTop: "10px",
                padding: "20px 30px",
                fontFamily: "Roboto",
                background: "#725b43",
              }}
            >
              <Link to="/log-trip" style={{ color: "white" }}>Log Your Shipping</Link>
            </Button>
          </div>
        )}
        {log.length > 0 ? (
          <div
            style={{
              margin: "0px auto",
              width: "100%",
              padding: "10px 15px",
              display: "flex",
              flexDirection: "column",
              borderRadius: "12px",
              flex: 1,
            }}
          >
            <LogsToday />
          </div>
        ) : (
          <div
            style={{
              background: "rgba(255, 255, 255, 0.23)",
              display: "flex",
              flexDirection: "column",
              margin: "5px 10px",
              borderRadius: "12px",
              maxWidth: "500px",
              flex: 1,
              padding: "60px 30px",
            }}
          >
            <Title
              level={1}
              style={{
                fontFamily: "Raleway",
                fontSize: "2rem",
                color: "white",
                textAlign: "left",
              }}
            >
              Hope you're having a nice journey
            </Title>
            <Text
              style={{
                fontFamily: "Roboto",
                fontSize: "1.4rem",
                color: "whitesmoke",
                textAlign: "left",
              }}
            >
              Don't forget to log your trip details!
            </Text>
            <div style={{ textAlign: "left" }}>
              <Button
                type="primary"
                style={{
                  marginTop: "10px",
                  padding: "20px 30px",
                  fontFamily: "Roboto",
                  background: "#725b43",
                }}
              >
                <Link to="/log-location" style={{ color: "white" }}>
                  Log Your Details
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Home;
