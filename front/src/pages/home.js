import { Button, Typography } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import "../assets/css/home.css";
import LogsToday from "../components/logsToday";
import UseTodaysLog from "../assets/hooks/useTodaysLog";

const { Title, Text } = Typography;

function Home() {
  const { log } = UseTodaysLog();
  return (
    <>
      <div className="home-bg">
        {log !== [] ? (
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
              padding: "10px 25px",
              background: "rgba(255, 255, 255, 0.23)",
              display: "flex",
              flexDirection: "column",
              margin: "5px 10px",
              borderRadius: "12px",
              maxWidth: "500px",
              flex: 1,
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
                fontSize: "1.7rem",
                color: "whitesmoke",
                textAlign: "left",
              }}
            >
              Remember to log your trip details!
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
