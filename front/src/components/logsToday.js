import React from "react";
import UseTodaysLog from "../assets/hooks/useTodaysLog";
import { Descriptions, Spin, Typography, Card, List } from "antd";
import { format } from "date-fns";

const { Title, Text } = Typography;

function LogsToday() {
  const { log, logLoading } = UseTodaysLog();

  const formatTime = (timeString) => {
    if (!timeString) return "N/A";
    const [hours, minutes] = timeString.split(":").map(Number);
    const now = new Date();
    const dateWithTime = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      hours,
      minutes
    );
    return format(dateWithTime, "p");
  };
  return (
    <>
      {log ? (
        <>
          {log && logLoading ? (
            <Spin size="large" style={styles.spinner} />
          ) : (
            log.map((log) => (
              <div
                style={{
                  background: "rgba(255, 255, 255, 0.5)",
                  padding: "10px 20px",
                  margin: "10px 10px",
                  borderRadius: "12px",
                }}
              >
                <Title level={2} style={styles.heading}>
                  Trip Log Today
                </Title>
                <Card style={styles.card}>
                  <Descriptions bordered column={2}>
                    <Descriptions.Item label="Pickup Location">
                      <Text style={styles.text}>{log.pickupLocation}</Text>
                    </Descriptions.Item>

                    <Descriptions.Item label="Pickup Time">
                      <Text style={styles.text}>
                      {formatTime(log.pickupTime)}
                      </Text>
                    </Descriptions.Item>

                    <Descriptions.Item label="Stops 📍" span={2}>
                      <List
                        dataSource={log.currentLocations}
                        renderItem={(location, index) => (
                          <List.Item key={location._id}>
                            <List.Item.Meta
                              title={
                                <Text>
                                  {index + 1}. {location.currentLocation} -{" "}
                                  {location.currentMode}
                                </Text>
                              }
                              description={
                                <Text type="secondary">
                                  {location.currentTime
                                    ? `Time: ${formatTime(
                                        location.currentTime
                                      )}`
                                    : "No time available"}
                                </Text>
                              }
                            />
                          </List.Item>
                        )}
                      />
                    </Descriptions.Item>
                  </Descriptions>
                </Card>
              </div>
            ))
          )}
        </>
      ) : (
        "n/a"
      )}
    </>
  );
}

export default LogsToday;

const styles = {
  container: {
    maxWidth: "900px",
    margin: "auto",
    padding: "40px 20px",
  },
  heading: {
    fontFamily: "Raleway",
    textAlign: "center",
    marginBottom: "20px",
    color: "#333",
  },
  collapse: {
    background: "#fff",
    borderRadius: "8px",
  },
  panel: {
    marginBottom: 16,
    background: "#f9f9f9",
    borderRadius: "8px",
    border: "1px solid #ddd",
  },
  panelHeader: {
    fontFamily: "Raleway",
    fontSize: "16px",
    fontWeight: "600",
  },
  card: {
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
    padding: "20px",
  },
  subHeading: {
    fontFamily: "Raleway",
    fontSize: "18px",
    fontWeight: "600",
    textDecoration: "underline",
  },
  text: {
    fontFamily: "Roboto",
    fontSize: "16px",
  },
  spinner: {
    display: "block",
    margin: "50px auto",
  },
  noLogs: {
    fontFamily: "Roboto",
    textAlign: "center",
    display: "block",
    marginTop: "30px",
    fontSize: "18px",
  },
};
