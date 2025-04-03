import React, { useState } from "react";
import { Modal, Button } from "antd";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  Polyline,
  InfoWindow,
} from "@react-google-maps/api";

// const rawData = [
//   {
//     key: "1743581078939",
//     currentCoordinates: { lat: -1.28333, lng: 36.81667 },
//     currentLocation: "Aga Khan High School, Nairobi",
//     currentMode: "Driving",
//     currentStartTime: "11:00",
//   },
//   {
//     key: "1743581093883",
//     currentLocation: "Location2",
//     currentMode: "Sleeper Berth",
//     currentStartTime: "12:00",
//     currentEndTime: "13:00",
//   },
//   {
//     key: "1743581111579",
//     currentCoordinates: { lat: -1.2351234, lng: 36.7901234 },
//     currentLocation: "Location3",
//     currentMode: "Driving",
//     currentStartTime: "13:00",
//     currentEndTime: "17:00",
//   },
//   {
//     key: "1743582864404",
//     currentCoordinates: { lat: -1.2682912, lng: 36.7408 },
//     currentLocation: "Location4",
//     currentMode: "On-Duty",
//     currentStartTime: "17:00",
//     currentEndTime: "22:00",
//   },
// ];

const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

const modeColors = {
  "Off-Duty": "red",
  "Sleeper Berth": "blue",
  Driving: "green",
  "On-Duty": "orange",
};

function Map({ locationData }) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: apiKey,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeMarker, setActiveMarker] = useState(null);

  const locations = locationData.filter((item) => item.currentCoordinates);

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <>
      <Button type="primary" onClick={() => setIsModalOpen(true)}>
        Open Trip Map
      </Button>
      <Modal
        title="Trip Map with Modes & Time"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        width={1000}
      >
        <GoogleMap
          mapContainerStyle={{ width: "100%", height: "500px" }}
          zoom={14}
          center={locations[0]?.currentCoordinates || { lat: 0, lng: 0 }}
        >
          {/* Markers for Each Location */}
          {locations.map((loc, index) => (
            <Marker
              key={loc.key}
              position={loc.currentCoordinates}
              icon={{
                url: `http://maps.google.com/mapfiles/ms/icons/${
                  modeColors[loc.currentMode] || "gray"
                }-dot.png`,
              }}
              onClick={() => setActiveMarker(index)}
            >
              {activeMarker === index && (
                <InfoWindow
                  position={loc.currentCoordinates}
                  onCloseClick={() => setActiveMarker(null)}
                >
                  <div>
                    <strong>{loc.currentLocation}</strong>
                    <p>Mode: {loc.currentMode}</p>
                    <p>
                      Time: {loc.currentStartTime} -{" "}
                      {loc.currentEndTime || "Ongoing"}
                    </p>
                  </div>
                </InfoWindow>
              )}
            </Marker>
          ))}

          <Polyline
            path={locations.map((loc) => loc.currentCoordinates)}
            options={{
              strokeColor: "#0000FF",
              strokeOpacity: 0.8,
              strokeWeight: 4,
            }}
          />
        </GoogleMap>
      </Modal>
    </>
  );
}

export default Map;
