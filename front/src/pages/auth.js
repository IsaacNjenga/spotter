import {
  DeleteOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";
import { Button, Card, Col, Divider, Form, Image, Input, Row } from "antd";
import axios from "axios";
import React, { useState } from "react";
import "../assets/css/auth.css";
import Swal from "sweetalert2";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  username: "",
  avatarUrl: "",
  avatarId: "",
  phoneNumber: "",
};

const inputStyle = {
  background: 0,
  border: "1px solid white",
  height: 40,
  fontSize: 14,
  color: "white",
  fontFamily: "Roboto",
};
function Auth() {
  const [form] = Form.useForm();
  const [values, setValues] = useState(initialValues);
  const [isSignUp, setSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageUrls, setImageUrls] = useState([]);
  const [imagePublicIds, setImagePublicIds] = useState([]);
  const [imageUploading, setImageUploading] = useState(false);

  const switchMode = () => {
    setSignUp((prev) => !prev);
  };

  const handleChange = (name, value) => {
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  //profile image
  const handleImageUpload = (e) => {
    Swal.fire({
      title: "Uploading your image...",
      text: "Please wait",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    setImageUploading(true);
    const files = Array.from(e.target.files); // Get all selected files
    const maxSize = 10 * 1024 * 1024;

    // Check each file size
    for (let file of files) {
      if (file.size > maxSize) {
        setImageUploading(false);
        return Swal.fire({
          icon: "error",
          title: "File exceeds limit!",
          text: "Please select a file less than 10MB",
          confirmButtonText: "OK",
        });
      }
    }

    const cloud_name = "dinsdfwod";
    const preset_key = "EasyManager";
    let newImageUrls = [];
    let newImagePublicIds = [];

    const uploadPromises = files.map((file) => {
      const formImageData = new FormData();
      formImageData.append("file", file);
      formImageData.append("upload_preset", preset_key);

      return axios
        .post(
          `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
          formImageData,
          { withCredentials: false }
        )
        .then((res) => {
          // For each uploaded image, update the arrays setImageUploading(true);

          newImageUrls.push(res.data.secure_url);
          newImagePublicIds.push(res.data.public_id);
        })
        .catch((error) => {
          console.log(error);
          Swal.fire({
            icon: "error",
            title: "Failed to upload image",
            text: "There was an unexpected error. Please try again",
            confirmButtonText: "OK",
          });
        });
    });

    // After all uploads are done, update the state
    Promise.all(uploadPromises)
      .then(() => {
        Swal.fire({ icon: "success", title: "Profile set successfully" });
        setImageUploading(false);

        setImageUrls((prevImages) => [...prevImages, ...newImageUrls]);
        setImagePublicIds((prevIds) => [...prevIds, ...newImagePublicIds]);
      })
      .catch((error) => {
        setImageUploading(false);
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Failed to upload your profile picture",
          text: "There was an unexpected error. Please try again",
          confirmButtonText: "OK",
        });
      });
  };

  const deletePicture = (e, publicId) => {
    e.preventDefault();
    if (!publicId) {
      return Swal.fire({
        icon: "error",
        title: "No image to delete!",
        text: "You have not selected a valid image to delete",
        confirmButtonText: "OK",
      });
    }
    setLoading(true);

    axios
      .delete("delete-image", { data: { publicId } })
      .then(() => {
        setImageUrls((prevImages) =>
          prevImages.filter((_, index) => imagePublicIds[index] !== publicId)
        );
        setImagePublicIds((prevIds) => prevIds.filter((id) => id !== publicId));
        setLoading(false);
        Swal.fire({ icon: "success", title: "Image removed!" });
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Failed to delete!",
          text: "Refresh the page and try again",
          confirmButtonText: "OK",
        });
      });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const valuesData = {
        ...values,
        avatarUrl: imageUrls[0],
        avatarId: imagePublicIds[0],
      };
      console.log(valuesData);
      const res = await axios.post(`${isSignUp ? "sign-up" : "login"}`, {
        ...values,
        avatarUrl: imageUrls[0],
        avatarId: imagePublicIds[0],
      });
      const { success, user, token } = res.data;
      if (success) {
        Swal.fire({
          icon: "success",
          title: isSignUp ? "Account Created" : "Login successful",
        });

        cookies.set("token", token);
        cookies.set("username", user.username);
        cookies.set("firstName", user.firstName);
        cookies.set("lastName", user.lastName);
        cookies.set("email", user.email);
        cookies.set("avatarUrl", user.avatarUrl);
        cookies.set("phoneNumber", user.phoneNumber);

        // if (isSignUp) {
        //   cookies.set("avatarUrl", user.avatarUrl);
        //   cookies.set("firstName", user.firstName);
        //   cookies.set("lastName", user.lastName);
        //   cookies.set("email", user.email);
        //   cookies.set("phoneNumber", user.phoneNumber);
        // }

        window.location.reload();
      }
    } catch (error) {
      console.log(error);
      const errorMessage =
        error.response && error.response.data && error.response.data.error
          ? error.response.data.error
          : "An unexpected error occurred. Please try again later.";

      Swal.fire({
        icon: "warning",
        title: "Error",
        text: errorMessage,
      });
    } finally {
      setLoading(false);
      form.resetFields();
      setValues(initialValues);
    }
  };
  return (
    <>
      <div className="auth-bg">
        <Card
          style={{
            background: "linear-gradient(to left, #4e5567 30%, #81817f 60%)",
            maxWidth: isSignUp ? 950 : 600,
            margin: "0px auto",
            padding: 0,
            height: "auto",
            width: "100%",
          }}
          className="card"
        >
          {" "}
          <Divider variant="solid" style={{ borderColor: "#fff" }}>
            <div
              style={{
                margin: "1px auto",
                padding: "1px 5px",
                borderRadius: "15px",
                fontFamily: "Raleway",
              }}
            >
              <span style={{ color: "#fff", fontSize: 18 }}>
                {isSignUp ? "Create your account" : "Log in to your account"}
              </span>
            </div>
          </Divider>
          <Form onFinish={handleSubmit} layout="vertical" form={form}>
            {isSignUp && (
              <Row gutter={[20, 20]}>
                <Col xs={24} md={10}>
                  <Form.Item
                    label={
                      <span
                        style={{
                          color: "#fff",
                          fontSize: 18,
                          fontFamily: "Roboto",
                        }}
                      >
                        Upload your profile picture
                      </span>
                    }
                  >
                    <div>
                      <label
                        htmlFor="file-upload"
                        className="custom-upload-button"
                      ></label>
                      <input
                        id="file-upload"
                        accept="image/*"
                        type="file"
                        onChange={handleImageUpload}
                      />
                    </div>
                    {imageUrls.length > 0 ? (
                      <div
                        className="image-preview-container"
                        style={{ marginTop: 10 }}
                      >
                        {imageUrls.map((url, index) => (
                          <div
                            key={imagePublicIds[index]}
                            style={{
                              position: "relative",
                              display: "inline-block",
                              marginRight: 8,
                            }}
                          >
                            <Button
                              type="text"
                              shape="circle"
                              icon={<DeleteOutlined />}
                              onClick={(e) =>
                                deletePicture(e, imagePublicIds[index])
                              }
                              style={{
                                position: "absolute",
                                top: -10,
                                right: -10,
                                zIndex: 1,
                                background: "white",
                              }}
                            />
                            <Image
                              src={url}
                              alt="uploaded"
                              style={{
                                width: 150,
                                height: 150,
                                objectFit: "cover",
                                borderRadius: 5,
                                margin: "10px",
                              }}
                            />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p
                        className="no-image-text"
                        style={{ marginTop: 10, color: "#999" }}
                      >
                        No image uploaded.
                      </p>
                    )}
                  </Form.Item>
                </Col>
                <Col xs={24} md={14}>
                  {isSignUp && (
                    <>
                      <div
                        style={{
                          display: "grid",
                          gap: "5px",
                          gridTemplateColumns:
                            "repeat(auto-fill, minmax(200px,1fr))",
                        }}
                      >
                        {/* First Name */}
                        <Form.Item
                          label={
                            <span
                              style={{
                                color: "#fff",
                                fontSize: 18,
                                fontFamily: "Roboto",
                              }}
                            >
                              First Name
                            </span>
                          }
                          name="firstName"
                          rules={[
                            {
                              required: true,
                              message: "This field is required",
                            },
                          ]}
                        >
                          <Input
                            value={values.firstName}
                            onChange={(e) =>
                              handleChange("firstName", e.target.value)
                            }
                            style={inputStyle}
                          />
                        </Form.Item>
                        {/* Last Name */}
                        <Form.Item
                          label={
                            <span
                              style={{
                                color: "#fff",
                                fontSize: 18,
                                fontFamily: "Roboto",
                              }}
                            >
                              Last Name
                            </span>
                          }
                          name="lastName"
                          rules={[
                            {
                              required: true,
                              message: "This field is required",
                            },
                          ]}
                        >
                          <Input
                            value={values.firstName}
                            onChange={(e) =>
                              handleChange("lastName", e.target.value)
                            }
                            style={inputStyle}
                          />
                        </Form.Item>
                        {/* Username */}
                        <Form.Item
                          label={
                            <span
                              style={{
                                color: "#fff",
                                fontSize: 18,
                                fontFamily: "Roboto",
                              }}
                            >
                              Username
                            </span>
                          }
                          name="username"
                          rules={[
                            {
                              required: true,
                              message: "This field is required",
                            },
                          ]}
                        >
                          <Input
                            value={values.username}
                            onChange={(e) =>
                              handleChange("username", e.target.value)
                            }
                            style={inputStyle}
                          />
                        </Form.Item>
                        {/* Email Address */}
                        <Form.Item
                          label={
                            <span
                              style={{
                                color: "#fff",
                                fontSize: 18,
                                fontFamily: "Roboto",
                              }}
                            >
                              Email Address
                            </span>
                          }
                          name="email"
                          rules={[
                            {
                              required: true,
                              message: "This field is required",
                            },
                          ]}
                        >
                          <Input
                            value={values.email}
                            onChange={(e) =>
                              handleChange("email", e.target.value)
                            }
                            style={inputStyle}
                          />
                        </Form.Item>
                        {/* Phone Number */}
                        <Form.Item
                          label={
                            <span
                              style={{
                                color: "#fff",
                                fontSize: 18,
                                fontFamily: "Roboto",
                              }}
                            >
                              Phone Number
                            </span>
                          }
                          name="phoneNumber"
                          rules={[
                            {
                              required: true,
                              message: "This field is required",
                            },
                          ]}
                        >
                          <Input
                            value={values.phoneNumber}
                            onChange={(e) =>
                              handleChange("phoneNumber", e.target.value)
                            }
                            style={inputStyle}
                          />
                        </Form.Item>
                      </div>
                      <div
                        style={{
                          display: "grid",
                          gap: "5px",
                          gridTemplateColumns:
                            "repeat(auto-fill, minmax(200px,1fr))",
                        }}
                      >
                        {/* Password */}
                        <Form.Item
                          label={
                            <span
                              style={{
                                color: "#fff",
                                fontSize: 18,
                                fontFamily: "Roboto",
                              }}
                            >
                              Password
                            </span>
                          }
                          name="password"
                          rules={[
                            {
                              required: true,
                              message: "This field is required",
                            },
                          ]}
                        >
                          <Input.Password
                            iconRender={(visible) =>
                              visible ? (
                                <EyeTwoTone style={{ color: "white" }} />
                              ) : (
                                <EyeInvisibleOutlined
                                  style={{ color: "white" }}
                                />
                              )
                            }
                            onChange={(e) =>
                              handleChange("password", e.target.value)
                            }
                            value={values.password}
                            style={inputStyle}
                          />
                        </Form.Item>
                        {/* Confirm Password */}

                        <Form.Item
                          label={
                            <span
                              style={{
                                color: "#fff",
                                fontSize: 18,
                                fontFamily: "Roboto",
                              }}
                            >
                              Re-enter password
                            </span>
                          }
                          name="confirmPassword"
                          dependencies={["password"]}
                          hasFeedback
                          rules={[
                            {
                              required: true,
                              message: "Please confirm your password",
                            },
                            ({ getFieldValue }) => ({
                              validator(_, value) {
                                if (
                                  !value ||
                                  getFieldValue("password") === value
                                ) {
                                  return Promise.resolve();
                                }
                                return Promise.reject(
                                  new Error("Passwords do not match")
                                );
                              },
                            }),
                          ]}
                        >
                          <Input.Password
                            iconRender={(visible) =>
                              visible ? (
                                <EyeTwoTone style={{ color: "white" }} />
                              ) : (
                                <EyeInvisibleOutlined
                                  style={{ color: "white" }}
                                />
                              )
                            }
                            style={inputStyle}
                          />
                        </Form.Item>
                      </div>
                    </>
                  )}
                </Col>
              </Row>
            )}

            {!isSignUp && (
              <>
                {/* Username */}
                <Form.Item
                  label={
                    <span
                      style={{
                        color: "#fff",
                        fontSize: 18,
                        fontFamily: "Roboto",
                      }}
                    >
                      Username
                    </span>
                  }
                  name="username"
                  rules={[
                    { required: true, message: "This field is required" },
                  ]}
                >
                  <Input
                    value={values.username}
                    onChange={(e) => handleChange("username", e.target.value)}
                    style={inputStyle}
                  />
                </Form.Item>
                <Form.Item
                  label={
                    <span
                      style={{
                        color: "#fff",
                        fontSize: 18,
                        fontFamily: "Roboto",
                      }}
                    >
                      Password
                    </span>
                  }
                  name="password"
                  rules={[
                    { required: true, message: "This field is required" },
                  ]}
                >
                  <Input.Password
                    iconRender={(visible) =>
                      visible ? (
                        <EyeTwoTone style={{ color: "white" }} />
                      ) : (
                        <EyeInvisibleOutlined style={{ color: "white" }} />
                      )
                    }
                    onChange={(e) => handleChange("password", e.target.value)}
                    value={values.password}
                    style={inputStyle}
                  />
                </Form.Item>
              </>
            )}

            <p style={{ color: "white", fontFamily: "Roboto" }}>
              {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
              <span
                onClick={switchMode}
                style={{ cursor: "pointer", textDecoration: "underline" }}
              >
                {isSignUp ? "Sign in" : "Sign up"}
              </span>
            </p>
            {/* Submission button */}
            <Form.Item style={{ textAlign: "center", marginTop: 10 }}>
              <Button
                loading={loading}
                htmlType="submit"
                type="primary"
                style={{
                  background: "#1578ff",
                  border: "1px solid white",
                  height: 40,
                  fontSize: 14,
                  fontWeight: "bold",
                  width: "50%",
                  fontFamily: "Raleway",
                }}
                disabled={imageUploading ? true : false}
              >
                {loading
                  ? isSignUp
                    ? "Signing Up"
                    : "Signing In"
                  : isSignUp
                  ? "Sign Up"
                  : "Sign In"}
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </>
  );
}

export default Auth;
