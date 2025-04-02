import React, { useEffect, useRef } from "react";
import { DataSet } from "vis-data";
import { Timeline } from "vis-timeline/standalone";
import "vis-timeline/styles/vis-timeline-graph2d.min.css";
import dayjs from "dayjs";

const ELDTimeline = ({ log, logLoading }) => {
  const timelineRef = useRef(null);
  const timelineInstance = useRef(null);
  // const { log, logLoading } = UseTodaysLog();

  useEffect(() => {
    if (!log || logLoading || !log[0]?.currentLocations) return;

    const timelineContainer = timelineRef.current;
    if (!timelineContainer) return;

    // Destroy previous timeline instance if it exists
    if (timelineInstance.current) {
      timelineInstance.current.destroy();
    }

    // Fixed colors & IDs for each status
    const statusGroups = {
      "Off-Duty": { id: 1, color: "#808080" },
      "Sleeper Berth": { id: 2, color: "#0047AB" },
      Driving: { id: 3, color: "#FF5733" },
      "On-Duty": { id: 4, color: "#28A745" },
    };

    // Transform log data to match timeline requirements
    const eldData = log[0].currentLocations.map((entry, index) => ({
      id: index,
      content: `${entry.currentMode} (${entry.currentLocation})`, // Show mode + location
      start: dayjs().format(`YYYY-MM-DDT${entry.currentStartTime}:00Z`), // Convert to ISO format
      end: entry.currentEndTime
        ? dayjs().format(`YYYY-MM-DDT${entry.currentEndTime}:00Z`)
        : null, // If no end time, keep it running
      group: statusGroups[entry.currentMode]?.id || 0,
      style: `background-color: ${
        statusGroups[entry.currentMode]?.color || "#000"
      }; color: white; border-radius: 8px; padding: 5px; font-weight: bold;`,
      title: `Location: ${entry.currentLocation}`, // Tooltip on hover
    }));

    // Create the dataset for the eld
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

    // Initialize timeline
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
      <div ref={timelineRef} style={{ height: "150%" }}></div>
    </div>
  );
};

export default ELDTimeline;
