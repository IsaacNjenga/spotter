import { Button, Input, TimePicker, Table, Space } from "antd";
import React from "react";
import {
  CheckOutlined,
  DeleteOutlined,
  EnvironmentOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import Swal from "sweetalert2";
import axios from "axios";
import Select from "react-select";

function CurrentLog({
  setValues,
  values,
  handleCurrentChange,
  inputStyle,
  handleCurrentTimeChange,
  address,
}) {
  const handleUseLocation = async (index) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          try {
            const res = await axios.get(`/geocode?lat=${lat}&lng=${lng}`);
            const formattedAddress =
              res.data.results[0]?.formatted || "Address not found";

            setValues((prev) => {
              const updatedLocations = [...prev.currentLocations];
              updatedLocations[index] = {
                ...updatedLocations[index],
                currentLocation: formattedAddress,
                currentCoordinates: { lat, lng },
              };
              return { ...prev, currentLocations: updatedLocations };
            });
          } catch (error) {
            console.error("Error fetching address:", error);
            Swal.fire({
              icon: "warning",
              title: "There was an issue",
              text: "Couldn't get your location.",
            });
          }
        },
        (error) => console.error("Error fetching location:", error)
      );
    } else {
      console.log("Geolocation not supported by this browser");
      Swal.fire({
        icon: "warning",
        title: "Geolocation not supported",
        text: "Enable location on your device",
      });
    }
  };

  const addNewRow = () => {
    setValues((prevValues) => ({
      ...prevValues,
      currentLocations: [
        ...prevValues.currentLocations,
        { key: Date.now(), currentLocation: "", currentTime: "" },
      ],
    }));
  };

  const removeCurrentRow = (index, e) => {
    e.preventDefault();
    setValues((prevValues) => {
      const updatedLocations = prevValues.currentLocations
        ? prevValues.currentLocations.filter((_, i) => i !== index)
        : [];

      return { ...prevValues, currentLocations: updatedLocations };
    });
  };

  const handleModeChange = (index, name, value) => {
    setValues((prevValues) => {
      const updatedLocations = [...prevValues.currentLocations];
      updatedLocations[index] = { ...updatedLocations[index], [name]: value };
      return { ...prevValues, currentLocations: updatedLocations };
    });
  };

  const modes = [
    { label: "Off-Duty", value: "Off-Duty" },
    { label: "Sleeper Berth", value: "Sleeper Berth" },
    { label: "Driving", value: "Driving" },
    { label: "On-Duty", value: "On-Duty" },
  ];

  const columns = [
    {
      title: "Set Coordinates",
      dataIndex: "currentCoordinates",
      render: (_, __, index) => (
        <Space.Compact
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <Button
            type="primary"
            onClick={() => handleUseLocation(index)}
            style={{
              borderRadius: "8px",
              fontWeight: 600,
              background: address ? "green" : "",
            }}
            icon={address ? <CheckOutlined /> : <EnvironmentOutlined />}
            title="Use My Location"
          />
        </Space.Compact>
      ),
    },
    {
      title: "Current Location",
      dataIndex: "currentLocation",
      render: (_, record, index) => {
        return (
          <Input
            value={record?.currentLocation || ""}
            onChange={(e) =>
              handleCurrentChange(index, "currentLocation", e.target.value)
            }
            placeholder="Enter location"
            style={inputStyle}
            required
          />
        );
      },
    },
    {
      title: "Set Start Time",
      dataIndex: "currentTime",
      render: (_, record, index) => (
        <TimePicker
          value={record.currentStartTime ? dayjs(record.currentStartTime, "HH:mm") : null}
          onChange={(value) =>
            handleCurrentTimeChange(index, "currentStartTime", value)
          }
          defaultOpenValue={dayjs("00:00", "HH:mm")}
          style={inputStyle}
          required
        />
      ),
    },  {
      title: "Set End Time",
      dataIndex: "currentTime",
      render: (_, record, index) => (
        <TimePicker
          value={record.currentEndTime ? dayjs(record.currentEndTime, "HH:mm") : null}
          onChange={(value) =>
            handleCurrentTimeChange(index, "currentEndTime", value)
          }
          defaultOpenValue={dayjs("00:00", "HH:mm")}
          style={inputStyle}
          required
        />
      ),
    },
    {
      title: "Mode",
      dataIndex: "currentMode",
      render: (_, record, index) => (
        <Select
          name="currentMode"
          onChange={(selectedOption) =>
            handleModeChange(index, "currentMode", selectedOption.value)
          }
          value={modes.find((mode) => mode.value === record.currentMode)}
          options={modes}
          getOptionLabel={(e) => e.label}
          getOptionValue={(e) => e.value}
          styles={{ width: "50%" }}
        />
      ),
    },
    {
      title: "",
      render: (_, __, index) => (
        <Button
          type="text"
          danger
          icon={<DeleteOutlined />}
          onClick={(e) => removeCurrentRow(index, e)}
          title="Remove"
        />
      ),
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        dataSource={
          values.currentLocations.length > 0 ? values.currentLocations : []
        }
        pagination={false}
        bordered
        rowKey={(record) => record.key}
        style={{ marginTop: "20px" }}
      />

      <Button
        type="dashed"
        onClick={addNewRow}
        block
        icon={<PlusOutlined />}
        style={{ marginTop: 10 }}
      >
        Add Row
      </Button>
    </>
  );
}

export default CurrentLog;
