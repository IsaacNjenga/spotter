import React, { useEffect, useRef, useState } from "react";
import { DataSet } from "vis-data";
import { Timeline } from "vis-timeline/standalone";
import "vis-timeline/styles/vis-timeline-graph2d.min.css";
import dayjs from "dayjs";
import { Button, Modal } from "antd";
import Map from "./map";

const ELDTimeline = ({ log, logLoading }) => {
  const timelineRef = useRef(null);
  const timelineInstance = useRef(null);

  const locationData = log[0]?.currentLocations;
  useEffect(() => {
    if (!log || logLoading || !log[0]?.currentLocations) {
      console.log("nothing received");
      return;
    }

    const timelineContainer = timelineRef.current;
    if (!timelineContainer) return;

    // Destroy previous timeline instance if it exists
    if (timelineInstance.current) {
      timelineInstance.current.destroy();
    }

    // Fixed the colors & IDs for each status
    const statusGroups = {
      "Off-Duty": { id: 1, color: "#808080" },
      "Sleeper Berth": { id: 2, color: "#0047AB" },
      Driving: { id: 3, color: "#FF5733" },
      "On-Duty": { id: 4, color: "#28A745" },
    };

    const eldData = log[0].currentLocations.map((entry, index) => ({
      id: index,
      content: `${entry.currentMode} (${entry.currentLocation})`,
      start: dayjs().format(`YYYY-MM-DDT${entry.currentStartTime}:00Z`),
      end: entry.currentEndTime
        ? dayjs().format(`YYYY-MM-DDT${entry.currentEndTime}:00Z`)
        : null,
      group: statusGroups[entry.currentMode]?.id || 0,
      style: `background-color: ${
        statusGroups[entry.currentMode]?.color || "#000"
      }; color: white; border-radius: 8px; padding: 5px; font-weight: bold;`,
      title: `Location: ${entry.currentLocation}`,
    }));

    const items = new DataSet(eldData);
    const groups = new DataSet([
      {
        id: 1,
        content: "Off-Duty",
        style: "font-size: 16px; font-weight: bold; font-family:'Roboto'",
      },
      {
        id: 2,
        content: "Sleeper Berth",
        style: "font-size: 16px; font-weight: bold; font-family:'Roboto'",
      },
      {
        id: 3,
        content: "Driving",
        style: "font-size: 16px; font-weight: bold; font-family:'Roboto'",
      },
      {
        id: 4,
        content: "On-Duty",
        style: "font-size: 16px; font-weight: bold; font-family:'Roboto'",
      },
    ]);

    timelineInstance.current = new Timeline(timelineContainer, items, {
      groups,
      stack: false,
      orientation: { axis: "top" },
      zoomable: true,
      start: eldData[0]?.start,
      end: eldData[eldData.length - 1]?.end,
      margin: { item: 5 },
      tooltip: { followMouse: true, overflowMethod: "cap" },
    });
  }, [log, logLoading]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <div
      style={{
        width: "100%",
        height: "auto",
        margin: "auto",
        padding: "15px",
        backgroundColor: "#f8f9fa",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ textAlign: "center", flex: 1 }}>
          <h2
            style={{
              textAlign: "center",
              marginBottom: "15px",
              color: "#333",
              fontFamily: "Raleway",
            }}
          >
            ELD Timeline
          </h2>
        </div>
        <div>
          <Button type="primary" onClick={showModal}>
            View Map
          </Button>
          <Modal
            title="Trip Map"
            open={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <Map locationData={locationData} />
          </Modal>
        </div>
      </div>
      <div ref={timelineRef} style={{ height: "150%" }}></div>
    </div>
  );
};

export default ELDTimeline;
