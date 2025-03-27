import {
  Button,
  Card,
  DatePicker,
  Divider,
  Form,
  Input,
  InputNumber,
  Radio,
} from "antd";
import React, { useState } from "react";
import "../assets/css/logs.css";
import { format } from "date-fns";

const initialValues = {
  carrierName: "",
  date: new Date(),
  totalMilesToday: 0,
  totalMileageToday: 0,
  codriverName: "",
  officeAddress: "",
  from: "",
  to: "",
};

function LogTrip() {
  const [values, setValues] = useState(initialValues);
  const [present, setPresent] = useState(false);
  const [date, setDate] = useState(null);
  const [form] = Form.useForm();

  const handleChange = (name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const onDateChange = (date) => {
    if (date) {
      const selectedDate = format(
        new Date(date.$d),
        "yyyy-MM-dd'T'HH:mm:ss'Z'"
      );
      setDate(selectedDate);
    }
  };

  const handleRadioChange = (e) => {
    if (e.target.value === "present") {
      setPresent(true);
    } else if (e.target.value === "absent") {
      setPresent(false);
    }
  };

  const handleSubmit = () => {
    form.resetFields();
    const valuesData = {
      ...values,
      date: date,
      codriverName: present ? values.codriverName : "absent",
    };
    console.log(valuesData);
  };

  return (
    <div className="log-bg">
      <div className="log-overlay">
        <div className="log-container">
          <Card
            title="Driver's Daily Log"
            className="log-card"
            style={{
              margin: "0px auto",
              padding: 0,
              height: "auto",
              width: "100%",
            }}
          >
            <Form form={form} layout="vertical" onFinish={handleSubmit}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                {/* Date */}
                <Form.Item
                  label={<p className="log-label">Date</p>}
                  name="date"
                  rules={[
                    { required: true, message: "This field is required" },
                  ]}
                  layout="horizontal"
                >
                  <DatePicker
                    onChange={onDateChange}
                    // onChange={(dateString) => handleChange("date", dateString)}
                    value={values.date}
                    className="log-input"
                  />
                </Form.Item>
                {/* From - to */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "8px",
                  }}
                >
                  <Form.Item
                    label={<p className="log-label">From</p>}
                    name="from"
                    rules={[
                      { required: true, message: "This field is required" },
                    ]}
                    layout="horizontal"
                  >
                    <Input
                      value={values.from}
                      onChange={(e) => handleChange("from", e.target.value)}
                      className="log-input"
                    />
                  </Form.Item>{" "}
                  <Form.Item
                    label={<p className="log-label">To</p>}
                    name="to"
                    rules={[
                      { required: true, message: "This field is required" },
                    ]}
                    layout="horizontal"
                  >
                    <Input
                      value={values.to}
                      onChange={(e) => handleChange("to", e.target.value)}
                      className="log-input"
                    />
                  </Form.Item>
                </div>
              </div>
              <Divider variant="solid" style={{ borderColor: "#017eac" }}>
                Basic Information
              </Divider>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding:'0px 30px'
                }}
              >
                <div
                  style={{
                    flex: 1,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      gap: "10px",
                    }}
                  >
                    {/* Miles and Mileage */}
                    <Form.Item
                      label={
                        <p className="log-label">Total Miles Driving Today</p>
                      }
                      name="totalMilesToday"
                      rules={[
                        { required: true, message: "This field is required" },
                      ]}
                      //   style={{ display: "flex", flexDirection: "column-reverse" }}
                    >
                      <InputNumber
                        value={values.totalMilesToday}
                        min={1}
                        onChange={(value) =>
                          handleChange("totalMilesToday", value)
                        }
                        className="log-input"
                      />
                    </Form.Item>{" "}
                    <Form.Item
                      label={<p className="log-label">Total Mileage Today</p>}
                      name="totalMileageToday"
                      rules={[
                        { required: true, message: "This field is required" },
                      ]}
                    >
                      <InputNumber
                        value={values.totalMileageToday}
                        min={1}
                        onChange={(value) =>
                          handleChange("totalMileageToday", value)
                        }
                        className="log-input"
                      />
                    </Form.Item>
                  </div>
                  <div>
                    <Form.Item
                      label={
                        <p className="log-label">
                          Truck/Tractor & Trailer Numbers or License
                          Plate(s)/State (show each unit)
                        </p>
                      }
                      name="vehicleNumbers"
                      rules={[
                        { required: true, message: "This field is required" },
                      ]}
                    >
                      <InputNumber
                        value={values.vehicleNumbers}
                        min={1}
                        onChange={(value) =>
                          handleChange("vehicleNumbers", value)
                        }
                        className="log-input"
                        style={{ width: "70%" }}
                      />
                    </Form.Item>
                  </div>
                  <div>
                    <Form.Item
                      label={<span className="log-label">Co-Driver</span>}
                      layout="horizontal"
                    >
                      <Radio.Group
                        onChange={handleRadioChange}
                        defaultValue="absent"
                      >
                        <Radio.Button
                          value="present"
                          style={{ fontFamily: "Roboto" }}
                        >
                          Present
                        </Radio.Button>
                        <Radio.Button
                          value="absent"
                          style={{ fontFamily: "Roboto" }}
                        >
                          Absent
                        </Radio.Button>
                      </Radio.Group>
                    </Form.Item>
                    {present && (
                      <Form.Item
                        label={<p className="log-label">Name of Co-Driver</p>}
                        name="codriverName"
                        rules={[
                          { required: true, message: "This field is required" },
                        ]}
                        layout="horizontal"
                      >
                        <Input
                          value={values.codriverName}
                          onChange={(e) =>
                            handleChange("codriverName", e.target.value)
                          }
                          className="log-input"
                          style={{ width: "70%" }}
                        />
                      </Form.Item>
                    )}
                  </div>
                </div>

                <div style={{ flex: 1 }}>
                  <Form.Item
                    label={<p className="log-label">Name of Carrier(s)</p>}
                    name="carrierName"
                    rules={[
                      { required: true, message: "This field is required" },
                    ]}
                  >
                    <Input
                      value={values.carrierName}
                      onChange={(e) =>
                        handleChange("carrierName", e.target.value)
                      }
                      className="log-input"
                    />
                  </Form.Item>{" "}
                  <Form.Item
                    label={<p className="log-label">Main Office Address</p>}
                    name="officeAddress"
                    rules={[
                      { required: true, message: "This field is required" },
                    ]}
                  >
                    <Input
                      value={values.officeAddress}
                      onChange={(e) =>
                        handleChange("officeAddress", e.target.value)
                      }
                      className="log-input"
                    />
                  </Form.Item>{" "}
                  <Form.Item
                    label={<p className="log-label">Home Terminal Address</p>}
                    name="terminalAddress"
                    rules={[
                      { required: true, message: "This field is required" },
                    ]}
                  >
                    <Input
                      value={values.terminalAddress}
                      onChange={(e) =>
                        handleChange("terminalAddress", e.target.value)
                      }
                      className="log-input"
                    />
                  </Form.Item>
                </div>
              </div>
              {/* <div>
                <ELDGrid eldData={eldData} />
              </div> */}
              <Form.Item>
                <Button type="primary" htmlType="submit" className="log-button">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default LogTrip;
