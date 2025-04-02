import React from "react";
import UseAllShippingLogs from "../assets/hooks/useAllShippingLogs";
import { Card, Descriptions, Spin, Typography, Collapse } from "antd";
import { format } from "date-fns";
import { CaretRightOutlined } from "@ant-design/icons";
import ELDTimeline from "../components/grid";

const { Title, Text } = Typography;
const { Panel } = Collapse;

function ShippingLogs() {
  const { shippingLogs, shippingsLoading } = UseAllShippingLogs();

  return (
    <div style={styles.container}>
      <Title level={2} style={styles.heading}>
        Shipping Logs
      </Title>

      {shippingsLoading ? (
        <Spin size="large" style={styles.spinner} />
      ) : shippingLogs.length > 0 ? (
        <Collapse
          accordion
          bordered={false}
          expandIcon={({ isActive }) => (
            <CaretRightOutlined rotate={isActive ? 90 : 0} />
          )}
          style={styles.collapse}
        >
          {shippingLogs.map((log) => (
            <Panel
              key={log._id}
              header={
                <Text style={styles.panelHeader}>
                  📅 {format(new Date(log.date), "PPPP")}
                </Text>
              }
              style={styles.panel}
            >
              <Card style={styles.card}>
                <Descriptions
                  title="Shipping Details"
                  bordered
                  column={3}
                  style={styles.label}
                >
                  <Descriptions.Item label="Carrier Name">
                    {log.carrierName}
                  </Descriptions.Item>
                  <Descriptions.Item label="Co-Driver Name">
                    {log.codriverName}
                  </Descriptions.Item>
                  <Descriptions.Item label="Vehicle Number">
                    {log.vehicleNumber}
                  </Descriptions.Item>
                  <Descriptions.Item label="From">{log.from}</Descriptions.Item>
                  <Descriptions.Item label="To">{log.to}</Descriptions.Item>
                  <Descriptions.Item label="Total Mileage Today">
                    {log.totalMileageToday} miles
                  </Descriptions.Item>
                  <Descriptions.Item label="Total Miles Today">
                    {log.totalMilesToday} miles
                  </Descriptions.Item>
                  <Descriptions.Item label="Office Address">
                    {log.officeAddress}
                  </Descriptions.Item>
                  <Descriptions.Item label="Terminal Address">
                    {log.terminalAddress}
                  </Descriptions.Item>
                </Descriptions>
                {/* <ELDTimeline eldData = {{}}/> */}
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
}

export default ShippingLogs;

const styles = {
  container: {
    maxWidth: "1000px",
    margin: "auto",
    padding: "5px 20px",
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
  label: {
    fontWeight: "bold",
    fontSize: "14px",
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
