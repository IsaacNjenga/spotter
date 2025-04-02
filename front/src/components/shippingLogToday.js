import React, { useState } from "react";
import {
  Button,
  Card,
  DatePicker,
  Divider,
  Form,
  Input,
  InputNumber,
  Spin,
} from "antd";
import UseShippingLogs from "../assets/hooks/useShippingLogs";
import dayjs from "dayjs";
import ELDTimeline from "./grid";
import { format } from "date-fns";
import { EditOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import UseTodaysLog from "../assets/hooks/useTodaysLog";

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

function ShippingLogToday() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { shippingLog, shippingLoading } = UseShippingLogs();
  const [present, setPresent] = useState(false);
  const [values, setValues] = useState(initialValues);
  const { log, logLoading } = UseTodaysLog();

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

  const today = new Date();

  const toUpdate = () => {
    navigate(`/update-shipping-log/${shippingLog[0]?._id}`);
  };

  return (
    <>
      {shippingLoading ? (
        <Spin size="large " style={{ display: "block", margin: "50px auto" }} />
      ) : (
        <Card
          title={
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
              }}
            >
              <div style={{ flex: 1 }}>
                <p>
                  Shipping Log: {format(new Date(today), "EEEE, do MMMM yyyy")}
                </p>
              </div>
              <div style={{ margin: "10px 10px" }}>
                <Button
                  type="primary"
                  title="Edit"
                  icon={<EditOutlined />}
                  onClick={toUpdate}
                >
                  Edit
                </Button>
              </div>
            </div>
          }
          className="log-card"
          style={{
            margin: "0px auto",
            padding: 0,
            height: "auto",
            width: "100%",
          }}
        >
          <Form form={form} layout="vertical" initialValues={values}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Form.Item
                label={<p className="log-label">Date</p>}
                name="date"
                layout="horizontal"
              >
                <DatePicker
                  value={values.date}
                  className="log-input"
                  readOnly
                  disabled
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
                  <Input value={values.from} className="log-input" readOnly />
                </Form.Item>{" "}
                <Form.Item
                  label={<p className="log-label">To</p>}
                  name="to"
                  rules={[
                    { required: true, message: "This field is required" },
                  ]}
                  layout="horizontal"
                >
                  <Input value={values.to} className="log-input" readOnly />
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
                      className="log-input"
                      readOnly
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
                      className="log-input"
                      readOnly
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
                      className="log-input"
                      style={{ width: "70%" }}
                      readOnly
                    />
                  </Form.Item>
                </div>
                <div>
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
                        className="log-input"
                        style={{ width: "70%" }}
                        readOnly
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
                    className="log-input"
                    readOnly
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
                    className="log-input"
                    readOnly
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
                    className="log-input"
                    readOnly
                  />
                </Form.Item>
              </div>
            </div>
            <div>
              <ELDTimeline log={log} logLoading={logLoading} />
            </div>
          </Form>
        </Card>
      )}
    </>
  );
}

export default ShippingLogToday;
