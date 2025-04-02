import React, { useState, useEffect } from "react";
import { Modal, Button } from "antd";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  Polyline,
  InfoWindow,
  DirectionsRenderer,
  DirectionsService,
} from "@react-google-maps/api";

// Define the locations (coordinates) for each stop
const locations = [
  { lat: -1.2582912, lng: 36.78208 },
  { lat: -1.2206103, lng: 36.85534588 },
  { lat: -1.2351234, lng: 36.7901234 },
  { lat: -1.2682912, lng: 36.7408 },
  { lat: -1.2482912, lng: 36.658208 },
  { lat: -1.2282912, lng: 36.92208 },
];

function MapWithMultipleStops() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyBKdS460pbtW4C0g5FvKZ7gDWQJNT7Oz0s", // Replace with your Google Maps API key
  });
  const [directions, setDirections] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeMarker, setActiveMarker] = useState(null); // Track active marker

  // Function to calculate directions for multiple stops
  useEffect(() => {
    if (isLoaded) {
      const directionsService = new window.google.maps.DirectionsService();
      const origin = locations[0];
      const destination = locations[locations.length - 1];
      const waypoints = locations.slice(1, locations.length - 1).map((loc) => ({
        location: new window.google.maps.LatLng(loc.lat, loc.lng),
        stopover: true,
      }));

      const request = {
        origin: new window.google.maps.LatLng(origin.lat, origin.lng),
        destination: new window.google.maps.LatLng(destination.lat, destination.lng),
        waypoints: waypoints,
        travelMode: window.google.maps.TravelMode.DRIVING, // or WALKING, BICYCLING, etc.
      };

      directionsService.route(request, (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          setDirections(result);
        } else {
          console.error("Directions request failed due to: " + status);
        }
      });
    }
  }, [isLoaded]);

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
        <div>
          <GoogleMap
            mapContainerStyle={{ width: "100%", height: "400px" }}
            zoom={14}
            center={locations[0]}
          >
            {/* Display markers for each location with titles */}
            {locations.map((loc, index) => (
              <Marker key={index} position={loc} onClick={() => setActiveMarker(index)}>
                {/* Show InfoWindow for the active marker */}
                {activeMarker === index && (
                  <InfoWindow position={loc} onCloseClick={() => setActiveMarker(null)}>
                    <div>{`Stop ${index + 1}`}</div> {/* Title for each stop */}
                  </InfoWindow>
                )}
              </Marker>
            ))}

            {/* Create a polyline (trail) connecting the locations */}
            <Polyline
              path={locations}
              options={{
                strokeColor: "#FF0000", // Trail color
                strokeOpacity: 1.0,
                strokeWeight: 3,
              }}
            />

            {/* Render the directions (route) between the stops */}
            {directions && <DirectionsRenderer directions={directions} />}
          </GoogleMap>
        </div>
      </Modal>
    </>
  );
}

export default MapWithMultipleStops;
