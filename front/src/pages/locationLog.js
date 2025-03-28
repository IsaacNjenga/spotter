import {
  Button,
  Card,
  Form,
  Input,
  TimePicker,
  Typography,
  Divider,
} from "antd";
import React, { useState } from "react";
import dayjs from "dayjs";
import axios from "axios";
import CurrentLog from "../components/currentLog";
import { format } from "date-fns";
import Swal from "sweetalert2";

const initialValues = {
  currentLocations: [],
  dropoffLocation: "",
  pickupLocation: "",
  pickupTime: "",
  dropoffTime: "",
};

const labelStyle = { fontFamily: "Raleway", fontWeight: 600 };
const inputStyle = {
  fontFamily: "Roboto",
  borderRadius: "8px",
};
const buttonStyle = {
  borderRadius: "8px",
  fontWeight: 600,
};
const cardStyle = {
  background: "#fff",
  maxWidth: 900,
  margin: "20px auto",
  padding: "20px",
  borderRadius: "12px",
  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
};

function LocationLog() {
  const [form] = Form.useForm();
  const [values, setValues] = useState(initialValues);
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleTimeChange = (name, time) => {
    if (time) {
      const selectedTime = format(
        new Date(time.$d),
        "yyyy-MM-dd'T'HH:mm:ss'Z'"
      );
      setValues((prev) => ({ ...prev, [name]: selectedTime }));
    }
  };

  const handleCurrentChange = (index, field, value) => {
    setValues((prevValues) => {
      const updatedLocations = [...prevValues.currentLocations];
      updatedLocations[index] = {
        ...updatedLocations[index],
        [field]: value,
      };
      return { ...prevValues, currentLocations: updatedLocations };
    });
  };

  const handleCurrentTimeChange = (index, field, value) => {
    setValues((prevValues) => {
      const updatedLocations = [...prevValues.currentLocations];
      updatedLocations[index] = {
        ...updatedLocations[index],
        [field]: value ? value.format("HH:mm") : "",
      };
      return { ...prevValues, currentLocations: updatedLocations };
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      console.log(values);
      const res = await axios.post("create-log", values);
      if (res.data.success) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Log saved successfully",
        });
        form.resetFields();
        setValues([]);
        setAddress("");
      }
    } catch (error) {
      console.log(error);
      const errorMessage =
        error.response && error.response.data && error.response.data.error
          ? error.response.data.error
          : "An Unexpected error occured. Please try again later";
      Swal.fire({ icon: "warning", title: "Error", text: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card style={cardStyle}>
      <Typography.Title level={3} style={{ textAlign: "center" }}>
        Location Logger
      </Typography.Title>
      <Form
        layout="vertical"
        form={form}
        onFinish={handleSubmit}
        initialValues={values}
      >
        <Divider>Pick Up Details</Divider>
        <Form.Item
          label={<span style={labelStyle}>Pickup Time</span>}
          name="pickupTime"
        >
          <TimePicker
            onChange={(value) => handleTimeChange("pickupTime", value)}
            defaultOpenValue={dayjs("00:00:00", "HH:mm:ss")}
            style={inputStyle}
          />
        </Form.Item>
        <Form.Item
          label={<span style={labelStyle}>Pickup Location</span>}
          name="pickupLocation"
        >
          <Input
            value={values.pickupLocation}
            onChange={(e) => handleChange("pickupLocation", e.target.value)}
            placeholder="Enter pickup location"
            style={inputStyle}
          />
        </Form.Item>

        <Divider>Current Location Details</Divider>
        <CurrentLog
          initialValues={initialValues}
          setValues={setValues}
          values={values}
          handleCurrentChange={handleCurrentChange}
          inputStyle={inputStyle}
          handleCurrentTimeChange={handleCurrentTimeChange}
          buttonStyle={buttonStyle}
          address={address}
        />

        <Divider>Drop Off Details</Divider>
        <Form.Item
          label={<span style={labelStyle}>Dropoff Time</span>}
          name="dropoffTime"
        >
          <TimePicker
            onChange={(value) => handleTimeChange("dropoffTime", value)}
            defaultOpenValue={dayjs("00:00:00", "HH:mm:ss")}
            style={inputStyle}
          />
        </Form.Item>
        <Form.Item
          label={<span style={labelStyle}>Dropoff Location</span>}
          name="dropoffLocation"
        >
          <Input
            value={values.dropoffLocation}
            onChange={(e) => handleChange("dropoffLocation", e.target.value)}
            placeholder="Enter dropoff location"
            style={inputStyle}
          />
        </Form.Item>
        <Divider />
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={buttonStyle}
            loading={loading}
          >
            {loading ? "Saving Log. Please wait" : "Save Log"}
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}

export default LocationLog;
