import React, { useContext, useState } from "react";
import UseTodaysLog from "../assets/hooks/useTodaysLog";
import {
  Button,
  Card,
  Form,
  Input,
  TimePicker,
  Typography,
  Divider,
  DatePicker,
  Spin,
} from "antd";
import dayjs from "dayjs";
import CurrentLog from "../components/currentLog";
import Swal from "sweetalert2";
import axios from "axios";
import { format } from "date-fns";
import { UserContext } from "../App";
import { useNavigate, useParams } from "react-router-dom";

const initialValues = {
  currentLocations: [],
  dropoffLocation: "",
  pickupLocation: "",
  pickupTime: "",
  dropoffTime: "",
  pickupDate: "",
  dropoffDate: "",
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


function UpdateLog() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { log, logLoading } = UseTodaysLog();
  const { user } = useContext(UserContext);
  const [form] = Form.useForm();
  const [values, setValues] = useState(initialValues);
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const onDateChange = (name, date) => {
    if (date) {
      setValues((prev) => ({
        ...prev,
        [name]: dayjs(date).toDate(),
      }));
    }
  };

  const handleTimeChange = (name, time) => {
    if (time) {
      const selectedTime = format(new Date(time.$d), "HH:mm");
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

  const handleCurrentTimeChange = (index, name, value) => {
    setValues((prevValues) => {
      const updatedLocations = [...prevValues.currentLocations];
      updatedLocations[index] = {
        ...updatedLocations[index],
        [name]: value ? value.format("HH:mm") : "",
      };
      return { ...prevValues, currentLocations: updatedLocations };
    });
  };

  React.useEffect(() => {
    if (log.length > 0) {
      setValues({
        currentLocations: log[0].currentLocations || [],
        dropoffLocation: log[0].dropoffLocation,
        pickupLocation: log[0].pickupLocation,
        pickupTime: log[0].pickupTime,
        dropoffTime: log[0].dropoffTime,
        pickupDate: log[0].pickupDate,
        dropoffDate: log[0].dropoffDate,
      });
      form.setFieldsValue({
        pickupDate: log[0].pickupDate ? dayjs(log[0].pickupDate) : null,
        pickupTime: log[0].pickupTime
          ? dayjs(log[0].pickupTime, "HH:mm")
          : null,
        dropoffDate: log[0].dropoffDate ? dayjs(log[0].dropoffDate) : null,
        dropoffTime: log[0].dropoffTime
          ? dayjs(log[0].dropoffTime, "HH:mm")
          : null,
        pickupLocation: log[0].pickupLocation,
        dropoffLocation: log[0].dropoffLocation,
      });
    }
  }, [log, form]);

  const handleSubmit = async () => {
    setLoading(true);
    const valuesData = { ...values, createdBy: user };
    console.log(valuesData);
    try {
      const res = await axios.put(`update-log/${id}`, valuesData);
      if (res.data.success) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Log saved successfully",
        });
        form.resetFields();
        setValues([]);
        setAddress("");
        navigate("/");
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
    <>
      {logLoading ? (
        <Spin size="large" style={{ display: "block", margin: "50px auto" }} />
      ) : (
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
            <div style={{ display: "flex", gap: "30px" }}>
              <Form.Item
                label={<span style={labelStyle}>Pickup Date</span>}
                name="pickupDate"
                layout="horizontal"
              >
                <DatePicker
                  onChange={(date) => onDateChange("pickupDate", date)}
                  value={values?.pickupDate ? dayjs(values.pickupDate) : null}
                />
              </Form.Item>
              <Form.Item
                label={<span style={labelStyle}>Pickup Time</span>}
                name="pickupTime"
                layout="horizontal"
              >
                <TimePicker
                  value={
                    values?.pickupTime
                      ? dayjs(values.pickupTime, "HH:mm")
                      : null
                  }
                  onChange={(value) => handleTimeChange("pickupTime", value)}
                  defaultOpenValue={dayjs("00:00", "HH:mm")}
                  style={inputStyle}
                />
              </Form.Item>{" "}
            </div>
            <Form.Item
              label={<span style={labelStyle}>Pickup Location</span>}
              name="pickupLocation"
            >
              <Input
                value={values?.pickupLocation}
                onChange={(e) => handleChange("pickupLocation", e.target.value)}
                placeholder="Enter pickup location"
                style={inputStyle}
              />
            </Form.Item>
            <Divider>Current Location Details</Divider>
            <CurrentLog
              setValues={setValues}
              values={values}
              handleCurrentChange={handleCurrentChange}
              inputStyle={inputStyle}
              handleCurrentTimeChange={handleCurrentTimeChange}
              buttonStyle={buttonStyle}
              address={address}
            />
            <Divider>Drop Off Details</Divider>{" "}
            <div style={{ display: "flex", gap: "30px" }}>
              <Form.Item
                label={<span style={labelStyle}>Dropoff Date</span>}
                name="dropoffDate"
                layout="horizontal"
              >
                <DatePicker
                  onChange={(date) => onDateChange("dropoffDate", date)}
                  value={values?.dropoffDate ? dayjs(values.dropoffDate) : null}
                />
              </Form.Item>
              <Form.Item
                label={<span style={labelStyle}>Dropoff Time</span>}
                name="dropoffTime"
                layout="horizontal"
              >
                <TimePicker
                  value={
                    values?.dropoffTime
                      ? dayjs(values.dropoffTime, "HH:mm")
                      : null
                  }
                  onChange={(value) => handleTimeChange("dropoffTime", value)}
                  defaultOpenValue={dayjs("00:00", "HH:mm")}
                  style={inputStyle}
                />
              </Form.Item>
            </div>
            <Form.Item
              label={<span style={labelStyle}>Dropoff Location</span>}
              name="dropoffLocation"
            >
              <Input
                value={values?.dropoffLocation}
                onChange={(e) =>
                  handleChange("dropoffLocation", e.target.value)
                }
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
                {loading ? "Updating Log. Please wait" : "Update Log"}
              </Button>
            </Form.Item>
          </Form>
        </Card>
      )}
    </>
  );
}

export default UpdateLog;
