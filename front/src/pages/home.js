import { Button, Typography } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import "../assets/css/home.css";

const { Title, Text } = Typography;

function Home() {
  return (
    <>
      <div className="home-bg">
        <div className="content-container">
          <div
            style={{
              padding: "35px 20px",
              background: "rgba(255, 255, 255, 0.3)",
              display: "flex",
              flexDirection: "column",
              margin: "10px 10px",
              borderRadius: "12px",
              maxWidth: "500px",
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
              Having a nice journey?
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
        </div>
      </div>
    </>
  );
}

export default Home;
