import React from "react";
import useLogs from "../assets/hooks/useLogs";
import { Card, Descriptions, Spin, Typography, Collapse, List } from "antd";
import { format } from "date-fns";
import { CaretRightOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;
const { Panel } = Collapse;

const Logs = () => {
  const { logs, logsLoading } = useLogs();

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
    <div style={styles.container}>
      <Title level={2} style={styles.heading}>
        Trip Logs
      </Title>

      {logsLoading ? (
        <Spin size="large" style={styles.spinner} />
      ) : logs.length > 0 ? (
        <Collapse
          accordion
          bordered={false}
          expandIcon={({ isActive }) => (
            <CaretRightOutlined rotate={isActive ? 90 : 0} />
          )}
          style={styles.collapse}
        >
          {logs.map((log) => (
            <Panel
              key={log._id}
              header={
                <Text style={styles.panelHeader}>
                  📅 {format(new Date(log.pickupDate), "PPPP")}
                </Text>
              }
              style={styles.panel}
            >
              <Card style={styles.card}>
                <Descriptions
                  title={<Text style={styles.subHeading}>Trip Details</Text>}
                  bordered
                  column={2}
                >
                  <Descriptions.Item label="Pickup Location">
                    <Text style={styles.text}>{log.pickupLocation}</Text>
                  </Descriptions.Item>

                  <Descriptions.Item label="Dropoff Location">
                    <Text style={styles.text}>
                      {log.dropoffLocation ? log.dropoffLocation : "-"}
                    </Text>
                  </Descriptions.Item>

                  <Descriptions.Item label="Pickup Time">
                    <Text style={styles.text}>
                      {formatTime(log.pickupTime)}
                    </Text>
                  </Descriptions.Item>

                  <Descriptions.Item label="Dropoff Time">
                    <Text style={styles.text}>
                      {formatTime(log.dropoffTime)}
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
                                  ? `Time: ${formatTime(location.currentTime)}`
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
            </Panel>
          ))}
        </Collapse>
      ) : (
        <Text type="secondary" style={styles.noLogs}>
          No logs found.
        </Text>
      )}
    </div>
  );
};

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

export default Logs;
