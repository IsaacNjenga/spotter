import { Button, Card, Form, Input, TimePicker, Space } from "antd";
import React, { useState } from "react";
import dayjs from "dayjs";
import { format } from "date-fns";
import { useLocation as useReactRouterLocation } from "react-router-dom";

const initialValues = {
  currentLocation: "",
  time: null,
};

function LocationLog() {
  const [form] = Form.useForm();
  const [values, setValues] = useState(initialValues);
  const reactRouterLocation = useReactRouterLocation();
  const [selectedLocation, setSelectedLocation] = useState({
    lat: null,
    lng: null,
  });

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
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          const locationString = `Lat: ${lat}, Lng: ${lng}`;

          // Update the input field
          setValues((prev) => ({ ...prev, currentLocation: locationString }));
          form.setFieldsValue({ currentLocation: locationString });
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
      </Card>
    </>
  );
}

export default LocationLog;
