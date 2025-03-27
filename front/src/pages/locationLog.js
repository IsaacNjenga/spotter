import { Button, Card, Form, Input, TimePicker, Space, Typography } from "antd";
import React, { useState } from "react";
import dayjs from "dayjs";
import { format } from "date-fns";
import axios from "axios";

const { Text } = Typography; // Ant Design Text component for display

const initialValues = {
  currentLocation: "",
  time: null,
};

function LocationLog() {
  const [form] = Form.useForm();
  const [values, setValues] = useState(initialValues);
  const [address, setAddress] = useState(""); // Store the fetched address

  const handleChange = (name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleTimeChange = (time) => {
    if (time) {
      const selectedTime = format(
        new Date(time.$d),
        "yyyy-MM-dd'T'HH:mm:ss'Z'"
      );
      handleChange("time", selectedTime);
    }
  };

  const useMyLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          const locationString = `Lat: ${lat}, Lng: ${lng}`;

          try {
            const res = await axios.get(`/geocode?lat=${lat}&lng=${lng}`);
            console.log("Geocode Response:", res.data);

            const formattedAddress =
              res.data.results[0]?.formatted || "Address not found";

            // Update input and display address
            setValues((prev) => ({ ...prev, currentLocation: locationString }));
            form.setFieldsValue({ currentLocation: locationString });
            setAddress(formattedAddress); // Store address for display
          } catch (error) {
            console.error("Error fetching address:", error);
          }
        },
        (error) => {
          console.error("Error fetching location:", error);
        }
      );
    } else {
      console.log("Geolocation not supported by this browser");
    }
  };

  const handleSubmit = () => {
    console.log(values);
    form.resetFields();
    setValues(initialValues);
    setAddress(""); // Clear address after submitting
  };

  return (
    <>
      <Card>
        <Form layout="vertical" form={form} onFinish={handleSubmit}>
          <Form.Item label="Select Time" name="time">
            <TimePicker
              onChange={handleTimeChange}
              defaultOpenValue={dayjs("00:00:00", "HH:mm:ss")}
            />
          </Form.Item>
          <Form.Item label="Current Location" name="currentLocation">
            <Space.Compact style={{ width: "100%" }}>
              <Input
                value={values.currentLocation}
                onChange={(e) =>
                  handleChange("currentLocation", e.target.value)
                }
                placeholder="Enter location or use GPS"
              />
              <Button type="primary" onClick={useMyLocation}>
                Use My Location
              </Button>
            </Space.Compact>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Log
            </Button>
          </Form.Item>
        </Form>

        {/* Display the fetched address */}
        {address && (
          <Text strong style={{ marginTop: "10px", display: "block" }}>
            Address: {address}
          </Text>
        )}
      </Card>
    </>
  );
}

export default LocationLog;
