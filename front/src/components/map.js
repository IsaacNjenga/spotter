import React, { useState } from "react";
import { Modal, Button } from "antd";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  Polyline,
  InfoWindow,
} from "@react-google-maps/api";

// Define stops with coordinates and labels
const locations = [
  { lat: -1.2582912, lng: 36.78208, title: "Start" },
  { lat: -1.2206103, lng: 36.85534588, title: "Second Stop" },
  { lat: -1.2351234, lng: 36.7901234, title: "Third Stop" },
  { lat: -1.2682912, lng: 36.7408, title: "Fourth Stop" },
  { lat: -1.2482912, lng: 36.658208, title: "Fifth Stop" },
  { lat: -1.2282912, lng: 36.92208, title: "Final Stop" },
];

// Define different colors for each stop
const colors = [
  "#FF0000",
  "#0000FF",
  "#008000",
  "#FFA500",
  "#800080",
  "#FF1493",
];

const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

function MapWithMultipleStops() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: apiKey,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeMarker, setActiveMarker] = useState(null);

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <>
      <Button type="primary" onClick={() => setIsModalOpen(true)}>
        Open Map with Multiple Stops
      </Button>
      <Modal
        title="Google Maps with Multiple Stops"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        width={900}
      >
        <GoogleMap
          mapContainerStyle={{ width: "100%", height: "500px" }}
          zoom={12}
          center={locations[0]}
        >
          {/* Display markers for each location */}
          {locations.map((loc, index) => (
            <Marker
              key={index}
              position={loc}
              icon={{
                url: `http://maps.google.com/mapfiles/ms/icons/${
                  index === 0
                    ? "red"
                    : index === locations.length - 1
                    ? "green"
                    : "blue"
                }-dot.png`,
              }}
              onClick={() => setActiveMarker(index)}
            >
              {activeMarker === index && (
                <InfoWindow
                  position={loc}
                  onCloseClick={() => setActiveMarker(null)}
                >
                  <div>{loc.title}</div>
                </InfoWindow>
              )}
            </Marker>
          ))}

          {/* Draw colored lines between stops */}
          {locations.slice(0, locations.length - 1).map((loc, index) => (
            <Polyline
              key={index}
              path={[loc, locations[index + 1]]} // Draw line from current stop to next stop
              options={{
                strokeColor: colors[index], // Different color for each segment
                strokeOpacity: 1.0,
                strokeWeight: 4,
              }}
            />
          ))}
        </GoogleMap>
      </Modal>
    </>
  );
}

export default MapWithMultipleStops;
