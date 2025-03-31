import React, { useContext, useState } from "react";
import { useLocation, Link, Outlet } from "react-router-dom";
import { Layout, Menu, FloatButton, Button, Drawer, Avatar } from "antd";
import FooterContent from "./footerContent";
import { UserContext } from "../App";
import {
  GithubOutlined,
  LinkedinFilled,
  MenuOutlined,
  XOutlined,
  PoweroffOutlined,
} from "@ant-design/icons";
import Cookie from "universal-cookie";
import Swal from "sweetalert2";

const cookies = new Cookie();

const { Header, Content, Footer } = Layout;

function Navbar() {
  const location = useLocation();
  const [current, setCurrent] = useState(location.pathname);
  const { isMobile } = useContext(UserContext);
  const [drawerVisible, setDrawerVisible] = useState(false);

  // const username = cookies.get("username");
  const firstName = cookies.get("firstName");
  const lastName = cookies.get("lastName");
  const avatarUrl = cookies.get("avatarUrl");

  const handleLogout = () => {
    Swal.fire({
      icon: "warning",
      text: "Are you sure you want to logout?",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const allCookies = cookies.getAll();
        for (const cookieName in allCookies) {
          if (allCookies.hasOwnProperty(cookieName)) {
            cookies.remove(cookieName);
          }
        }
        window.location.reload();
      }
    });
  };

  const navItems = [
    { label: "Home", path: "/" },
    { label: "Daily Log", path: "/log-trip" },
    { label: "Logs", path: "/logs" },
  ];

  const toggleDrawer = () => setDrawerVisible(!drawerVisible);

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  return (
    <>
      <FloatButton.Group shape="circle" style={{ insetInlineEnd: 24 }}>
        <FloatButton.BackTop title="Back to top" />
      </FloatButton.Group>
      <Layout style={{ minHeight: "100vh" }}>
        <div style={{ position: "sticky", top: 0, zIndex: 1 }}>
          <Header
            style={{
              height: "auto",
              width: "100%",
              background: "#e9e8e6",
              padding: "10px 15px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              {isMobile ? (
                <>
                  <Avatar
                    src={avatarUrl}
                    size={"large"}
                    style={{
                      marginRight: "10px",
                    }}
                  />
                  <h1
                    style={{
                      margin: 0,
                      fontSize: "1.3rem",
                      letterSpacing: "1px",
                      fontFamily: "Raleway",
                      // zIndex: 10,
                      color: "#3c3b39",
                    }}
                  >
                    <Link
                      to="/"
                      style={{
                        textDecoration: "none",
                        color: "#3c3b39",
                        borderBottom: "2px solid #2a75d7",
                      }}
                    >
                      {firstName.toUpperCase()} {lastName.toUpperCase()}{" "}
                    </Link>
                  </h1>
                </>
              ) : (
                <>
                  <Avatar
                    src={avatarUrl}
                    size={"large"}
                    style={{
                      marginRight: "10px",
                    }}
                  />
                  <h1
                    style={{
                      margin: 0,
                      fontSize: "2rem",
                      letterSpacing: "2px",
                      fontFamily: "Raleway",
                      // zIndex: 10,
                      color: "#3c3b39",
                      fontWeight: "lighter",
                    }}
                  >
                    <Link
                      to="/"
                      style={{
                        textDecoration: "none",
                        color: "#3c3b39",
                        borderBottom: "2px solid #2a75d7",
                      }}
                    >
                      {firstName?.toUpperCase()} {lastName?.toUpperCase()}
                    </Link>
                  </h1>
                </>
              )}
            </div>
            {isMobile ? (
              <>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "right",
                  }}
                >
                  {" "}
                  <Button
                    type="primary"
                    shape="circle"
                    style={{
                      background: "rgb(0,0,0,0)",
                      color: "grey",
                      border: "1px solid grey",
                    }}
                    title="Logout"
                    onClick={handleLogout}
                  >
                    <PoweroffOutlined />
                  </Button>
                </div>{" "}
                <Button
                  type="text"
                  onClick={toggleDrawer}
                  icon={
                    <MenuOutlined
                      style={{ fontSize: "1.8rem", color: "#3c3b39" }}
                    />
                  }
                />
              </>
            ) : (
              <>
                {" "}
                <Menu
                  theme="light"
                  mode="horizontal"
                  selectedKeys={[current]}
                  onClick={handleClick}
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    fontSize: "15px",
                    fontWeight: "lighter",
                    background: "rgb(0,0,0,0)",
                    borderColor: "rgb(0,0,0,0)",
                    fontFamily: "Raleway",
                  }}
                >
                  {navItems.map((item) => (
                    <Menu.Item
                      key={item.path}
                      //   icon={<item.icon style={{ fontSize: "1.8rem" }} />}
                    >
                      <Link
                        to={item.path}
                        style={{
                          color: "#3c3b39",
                          textDecoration: "none",
                        }}
                      >
                        {item.label}
                      </Link>
                    </Menu.Item>
                  ))}
                </Menu>
                <Button
                  type="primary"
                  shape="circle"
                  style={{
                    marginRight: "10px",
                    background: "rgb(0,0,0,0)",
                    color: "grey",
                    border: "1px solid grey",
                  }}
                  title="Logout"
                  onClick={handleLogout}
                >
                  <PoweroffOutlined />
                </Button>
                <div
                  style={{
                    fontSize: "23px",
                    // display: "flex",
                    gap: "10px",
                    color: "grey",
                    marginRight: "10px",
                    textDecoration: "none",
                    display: "none",
                  }}
                >
                  <a
                    href="https://www.linkedin.com/in/isaacnjenga/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: "grey",
                    }}
                  >
                    <LinkedinFilled title="LinkedIn" />
                  </a>
                  <a
                    href="https://github.com/IsaacNjenga"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: "grey",
                    }}
                  >
                    {" "}
                    <GithubOutlined title="GitHub" />
                  </a>{" "}
                  <a
                    href="https://x.com/IsaacNj95195172"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: "grey",
                    }}
                  >
                    <XOutlined title="X" />
                  </a>{" "}
                </div>
              </>
            )}
          </Header>{" "}
          {/* Mobile Navigation */}
          <Drawer
            placement="right"
            width={280}
            onClose={toggleDrawer}
            open={drawerVisible}
          >
            <Menu
              mode="vertical"
              selectedKeys={[current]}
              onClick={handleClick}
              style={{
                background: "rgb(0,0,0,0)",
                borderColor: "rgb(0,0,0,0)",
                fontFamily: "Raleway",
                fontWeight: "bold",
              }}
            >
              {navItems.map((item) => (
                <Menu.Item key={item.path}>
                  <Link
                    to={item.path}
                    style={{ color: "#3c3b39", textDecoration: "none" }}
                  >
                    {item.label}
                  </Link>
                </Menu.Item>
              ))}
            </Menu>
          </Drawer>
        </div>
        {/* Main Content */}
        <Content
          style={{
            padding: isMobile ? "0px 0px" : "0px 0px",
            minHeight: "calc(100vh - 64px - 70px)",
          }}
        >
          <Outlet />
        </Content>
        {/* Footer */}
        <Footer
          style={{
            padding: "0px 0px",
            margin: "0px 0px",
            background: "#eae9e7",
          }}
        >
          <FooterContent />
        </Footer>
      </Layout>
    </>
  );
}

export default Navbar;
