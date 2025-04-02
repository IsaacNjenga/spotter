import React, { useState, useContext } from "react";
import {
  Button,
  Card,
  DatePicker,
  Divider,
  Form,
  Input,
  InputNumber,
  Radio,
  Spin,
} from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../App";
import axios from "axios";
import Swal from "sweetalert2";
import UseShippingLogs from "../assets/hooks/useShippingLogs";
import dayjs from "dayjs";

const initialValues = {
  carrierName: "",
  date: "",
  totalMilesToday: 0,
  totalMileageToday: 0,
  codriverName: "",
  officeAddress: "",
  from: "",
  to: "",
  terminalAddress: "",
  vehicleNumber: "",
};

function UpdateShippingLog() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [values, setValues] = useState(initialValues);
  const [present, setPresent] = useState(false);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { shippingLog, shippingLoading } = UseShippingLogs();

  React.useEffect(() => {
    if (shippingLog.length > 0) {
      setValues({
        carrierName: shippingLog[0].carrierName,
        date: shippingLog[0].date,
        totalMilesToday: shippingLog[0].totalMilesToday,
        totalMileageToday: shippingLog[0].totalMileageToday,
        codriverName: shippingLog[0].codriverName ? setPresent(true) : null,
        officeAddress: shippingLog[0].officeAddress,
        from: shippingLog[0].from,
        to: shippingLog[0].to,
        terminalAddress: shippingLog[0].terminalAddress,
        vehicleNumber: shippingLog[0].vehicleNumber,
      });
      form.setFieldsValue({
        carrierName: shippingLog[0].carrierName,
        date: shippingLog[0].date ? dayjs(shippingLog[0].date) : null,
        totalMilesToday: shippingLog[0].totalMilesToday,
        totalMileageToday: shippingLog[0].totalMileageToday,
        codriverName: shippingLog[0].codriverName,
        officeAddress: shippingLog[0].officeAddress,
        from: shippingLog[0].from,
        to: shippingLog[0].to,
        terminalAddress: shippingLog[0].terminalAddress,
        vehicleNumber: shippingLog[0].vehicleNumber,
      });
    }
  }, [form, shippingLog]);

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

  const handleRadioChange = (e) => {
    if (e.target.value === "present") {
      setPresent(true);
    } else if (e.target.value === "absent") {
      setPresent(false);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const valuesData = {
        ...values,
        codriverName: present ? values.codriverName : "absent",
        createdBy: user,
      };
      // console.log(valuesData);
      const res = await axios.put(`update-shipping-log/${id}`, valuesData);
      if (res.data.success) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Log saved successfully",
        });
        form.resetFields();
        setValues([]);
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
      {shippingLoading ? (
        <Spin size="large" style={{ display: "block", margin: "50px auto" }} />
      ) : (
        <Card
          title="Update Driver's Daily Log"
          className="log-card"
          style={{
            margin: "0px auto",
            padding: 0,
            height: "auto",
            width: "100%",
          }}
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            initialValues={values}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              {/* Date */}
              <Form.Item
                label={<p className="log-label">Date</p>}
                name="date"
                rules={[{ required: true, message: "This field is required" }]}
                layout="horizontal"
              >
                <DatePicker
                  onChange={(date) => onDateChange("date", date)}
                  value={values?.date ? dayjs(values.date) : null}
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
                padding: "0px 30px",
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
                    name="vehicleNumber"
                    rules={[
                      { required: true, message: "This field is required" },
                    ]}
                  >
                    <InputNumber
                      value={values.vehicleNumber}
                      min={1}
                      onChange={(value) => handleChange("vehicleNumber", value)}
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
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{
                  width: "30%",
                  padding: "15px",
                  fontSize: "16px",
                  borderRadius: "12px",
                  border: "none",
                }}
                loading={loading}
                disabled={loading ? true : false}
              >
                {loading ? "Updating" : "Update"}
              </Button>
            </Form.Item>
          </Form>
        </Card>
      )}
    </>
  );
}

export default UpdateShippingLog;
