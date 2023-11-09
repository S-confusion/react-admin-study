import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
const { Header, Content, Footer, Sider } = Layout;

function getItem(
  label,
  key,
  icon,
  children
) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem("页面1", "/page1", <PieChartOutlined />),
  getItem("页面2", "/page2", <DesktopOutlined />),
  getItem("页面组", "page3", <UserOutlined />, [
    getItem("页面301", "/page3/page301"),
    getItem("页面302", "/page3/page302"),
  ]),
  getItem("关于我们", "/about", <FileOutlined />),
];

const Home = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigateTo = useNavigate();
  // 初始化路由
  const currentRoute = useLocation();
  const routeStand = currentRoute.pathname.split("/");
  const [openKeys, setOpenKeys] = useState(routeStand);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const { userInfo } = useSelector((state) => ({
    userInfo: state.reducerUser.userInfo,
  }));
  // 点击导航
  const handleMenu = (e) => {
    navigateTo(e.key);
  };

  // console.log(currentRoute, "currentRoute");
  // 展开多级导航
  const handleOpenChange = (keys) => {
    setOpenKeys([keys[keys.length - 1]]);
  };
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical">logo</div>
        <Menu
          theme="dark"
          defaultSelectedKeys={[currentRoute.pathname]}
          mode="inline"
          items={items}
          openKeys={openKeys}
          onClick={handleMenu}
          onOpenChange={handleOpenChange}
        />
      </Sider>
      <Layout className="layout">
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            paddingLeft: "16px",
          }}
        >
          <Breadcrumb style={{ lineHeight: "64px" }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div className="user--area">{userInfo.userName}</div>
        </Header>
        <div className="container">
          <Content className="router-component">
            <Outlet></Outlet>
          </Content>
          <Footer
            style={{ textAlign: "center", padding: 0, lineHeight: "48px" }}
          >
            Ant Design ©2023 Created by Ant UED
          </Footer>
        </div>
      </Layout>
    </Layout>
  );
};

export default Home;
