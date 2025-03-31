import { Button, Typography } from "antd";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "../assets/css/home.css";
import LogsToday from "../components/logsToday";
import { UserContext } from "../App";

const { Title, Text } = Typography;

function Home() {
  const { isMobile } = useContext(UserContext);
  return (
    <>
      <div className="home-bg">
        <div
          style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            gap: "10px",
            justifyContent: "space-around",
          }}
        >
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
                  Log Your Location
                </Link>
              </Button>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              
              flex: 1,
            }}
          >
            <LogsToday />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
