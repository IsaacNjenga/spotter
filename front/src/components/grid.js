import React, { useEffect, useRef } from "react";
import { DataSet } from "vis-data";
import { Timeline } from "vis-timeline/standalone";
import "vis-timeline/styles/vis-timeline-graph2d.min.css"; // Import default styles

const ELDTimeline = ({ eldData }) => {
  const timelineRef = useRef(null);

  useEffect(() => {
    if (timelineRef.current) {
      // Define fixed positions & colors for each status
      const statusGroups = {
        "Off-Duty": { id: 1, color: "#808080" }, // Gray
        "Sleeper Berth": { id: 2, color: "#0047AB" }, // Navy Blue
        "Driving": { id: 3, color: "#FF5733" }, // Orange
        "On-Duty": { id: 4, color: "#28A745" }, // Green
      };

      // Sort eldData by time
      const sortedData = eldData.slice().sort((a, b) => new Date(a.startTime) - new Date(b.startTime));

      // Create dataset for items with custom styles
      const items = new DataSet(
        sortedData.map((log, index) => ({
          id: index,
          content: log.status,
          start: log.startTime,
          end: log.endTime,
          group: statusGroups[log.status].id, // Assign logs to a row
          style: `background-color: ${statusGroups[log.status].color}; color: white; border-radius: 8px; padding: 5px; font-weight: bold;`,
        }))
      );

      // Create dataset for groups (labels on the left)
      const groups = new DataSet([
        { id: 1, content: "Off-Duty", style: "font-size: 16px; font-weight: bold;" },
        { id: 2, content: "Sleeper Berth", style: "font-size: 16px; font-weight: bold;" },
        { id: 3, content: "Driving", style: "font-size: 16px; font-weight: bold;" },
        { id: 4, content: "On-Duty", style: "font-size: 16px; font-weight: bold;" },
      ]);

      new Timeline(timelineRef.current, items, {
        groups, // Assign groups to timeline
        stack: false, // Prevent overlapping
        orientation: { axis: "top" }, // Move timeline to bottom
        zoomable: true,
        start: sortedData[0]?.startTime, // Auto-start from first log
        end: sortedData[sortedData.length - 1]?.endTime, // Auto-end at last log
        margin: { item: 10 }, // Add spacing
        tooltip: { followMouse: true, overflowMethod: "cap" }, // Enable tooltips
      });
    }
  }, [eldData]);

  return (
    <div style={{ width: "100%", height: "450px", margin: "auto", padding: "20px", backgroundColor: "#f8f9fa", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
      <h2 style={{ textAlign: "center", marginBottom: "15px", color: "#333" }}>ELD Logs Timeline</h2>
      <div ref={timelineRef} style={{ height: "100%" }}></div>
    </div>
  );
};

export default ELDTimeline;
