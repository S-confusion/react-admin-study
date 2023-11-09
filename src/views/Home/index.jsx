import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Popconfirm, Button, Layout, Menu } from "antd";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { setToken, setUser, getUser } from "@/store/modules/user";
import styles from "./home.module.scss";

const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
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
  const navigator = useNavigate();
  const dispatch = useDispatch();
  // 初始化路由
  const currentRoute = useLocation();
  const routeStand = currentRoute.pathname.split("/");
  const [openKeys, setOpenKeys] = useState(routeStand);
  const { token } = useSelector((state) => state.userReducer);

  const { user } = useSelector((state) => state.userReducer);

  // 点击导航
  const handleMenu = (e) => {
    navigator(e.key);
  };

  // console.log(currentRoute, "currentRoute");
  // 展开多级导航
  const handleOpenChange = (keys) => {
    setOpenKeys([keys[keys.length - 1]]);
  };

  useEffect(() => {
    token && dispatch(getUser());
  }, [token]);

  // 退出登录
  const logout = () => {
    // 清除token
    dispatch(setToken(null));
    dispatch(setUser({}));
    // 清除登录信息
    navigator("/login");
  };
  return (
    <Layout className={styles.root} style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
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
          className="header"
          style={{
            padding: 0,
            paddingLeft: "16px",
          }}
        >
          <div className="user-area">
            <div className="user-name">{user?.mobile}</div>
            <Popconfirm
              placement="bottom"
              title="Are you sure to logout?"
              okText="Yes"
              cancelText="No"
              onConfirm={() => logout()}
            >
              <Button>退出登录</Button>
            </Popconfirm>
          </div>
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
