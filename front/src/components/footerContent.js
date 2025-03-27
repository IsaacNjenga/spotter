import { XOutlined, GithubOutlined, LinkedinFilled } from "@ant-design/icons";
import React from "react";

function FooterContent() {
  return (
    <footer
      style={{
        padding: "20px",
        textAlign: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <p style={{ color: "#3c3b39" }}>
          Copyright &copy; {new Date().getFullYear()} By Isaac Njenga. <br />
          All Rights Reserved.
        </p>
        <div style={{ fontSize: "20px", marginTop: "10px" }}>
          <a
            href="https://www.linkedin.com/in/isaacnjenga/"
            target="_blank"
            rel="noopener noreferrer"
          >
            {" "}
            <LinkedinFilled
              style={{
                color: "#81817f",
                borderRadius: "50%",
                background: "rgb(0,0,0,0)",
                padding: 8,
                border: "1px solid #81817f",
                margin: "0 10px",
              }}
            />
          </a>
          <a
            href="https://github.com/IsaacNjenga"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GithubOutlined
              style={{
                color: "#81817f",
                borderRadius: "50%",
                background: "rgb(0,0,0,0)",
                padding: 8,
                border: "1px solid #81817f",
                margin: "0 10px",
              }}
            />
          </a>{" "}
          <a
            href="https://x.com/IsaacNj95195172"
            target="_blank"
            rel="noopener noreferrer"
          >
            <XOutlined
              style={{
                color: "#81817f",
                borderRadius: "50%",
                background: "rgb(0,0,0,0)",
                padding: 8,
                border: "1px solid #81817f",
                margin: "0 10px",
              }}
            />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default FooterContent;
