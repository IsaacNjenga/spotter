import React, { useState } from "react";
import { Button, Card, DatePicker, Form, Input, InputNumber, Radio, Steps, Modal } from "antd";

const { Step } = Steps;

const LogTrip2 = () => {
  const [form] = Form.useForm();
  const [currentStep, setCurrentStep] = useState(0);
  const [formValues, setFormValues] = useState({});
  const [modalVisible, setModalVisible] = useState(false);

  const steps = [
    {
      title: "Step 1",
      content: (
        <>
          <Form.Item label="Date" name="date" rules={[{ required: true, message: "Required" }]}>
            <DatePicker />
          </Form.Item>
          <Form.Item label="From" name="from" rules={[{ required: true, message: "Required" }]}>
            <Input />
          </Form.Item>
          <Form.Item label="To" name="to" rules={[{ required: true, message: "Required" }]}>
            <Input />
          </Form.Item>
        </>
      ),
    },
    {
      title: "Step 2",
      content: (
        <>
          <Form.Item label="Total Miles Today" name="totalMilesToday" rules={[{ required: true, message: "Required" }]}>
            <InputNumber min={1} />
          </Form.Item>
          <Form.Item label="Carrier Name" name="carrierName" rules={[{ required: true, message: "Required" }]}>
            <Input />
          </Form.Item>
        </>
      ),
    },
    {
      title: "Step 3",
      content: (
        <>
          <Form.Item label="Current Location" name="currentLocation" rules={[{ required: true, message: "Required" }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Dropoff Location" name="dropoffLocation" rules={[{ required: true, message: "Required" }]}>
            <Input />
          </Form.Item>
        </>
      ),
    },
  ];

  const next = async () => {
    try {
      await form.validateFields();
      setCurrentStep(currentStep + 1);
    } catch (error) {
      console.log("Validation Failed:", error);
    }
  };

  const prev = () => setCurrentStep(currentStep - 1);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setFormValues(values);
      setModalVisible(true);
    } catch (error) {
      console.log("Validation Failed:", error);
    }
  };

  const confirmSubmit = () => {
    console.log("Final Submission:", formValues);
    setModalVisible(false);
  };

  return (
    <Card title="Driver's Daily Log">
      <Steps current={currentStep}>
        {steps.map((step, index) => (
          <Step key={index} title={step.title} />
        ))}
      </Steps>

      <Form form={form} layout="vertical">
        {steps[currentStep].content}
      </Form>

      <div style={{ marginTop: 20 }}>
        {currentStep > 0 && <Button onClick={prev} style={{ marginRight: 8 }}>Previous</Button>}
        {currentStep < steps.length - 1 && <Button type="primary" onClick={next}>Next</Button>}
        {currentStep === steps.length - 1 && <Button type="primary" onClick={handleSubmit}>Review & Submit</Button>}
      </div>

      {/* Modal for final review */}
      <Modal title="Review Your Inputs" visible={modalVisible} onOk={confirmSubmit} onCancel={() => setModalVisible(false)}>
        {Object.keys(formValues).map((key) => (
          <p key={key}>
            <strong>{key}:</strong> {formValues[key]?.toString()}
          </p>
        ))}
      </Modal>
    </Card>
  );
};

export default LogTrip2;
