import React, { PropsWithChildren, FC } from "react"
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons"
import { Button, Col, MenuProps, Row } from "antd"
import { Breadcrumb, Layout as AntdLayout, Menu, theme } from "antd"
import { useNavigate } from "react-router-dom"
import { useStore } from "../../stores/root-store"

const { Header, Content, Sider } = AntdLayout

const items1: MenuProps["items"] = ["1", "2", "3"].map((key) => ({
  key,
  label: `nav ${key}`,
}))

const items2: MenuProps["items"] = [
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
].map((icon, index) => {
  const key = String(index + 1)

  return {
    key: `sub${key}`,
    icon: React.createElement(icon),
    label: `subnav ${key}`,
  }
})

const AdminLayout: FC<PropsWithChildren> = ({ children }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken()
  const navigate = useNavigate()
  const { authStore } = useStore()

  return (
    <AntdLayout>
      <Header className="header">
        <Row>
          <Col span={12}>
            {/* <div className="logo" style={{ color: "white" }}>
              logo
            </div> */}
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={["/"]}
              onClick={(info) => navigate(info.key)}
              items={[
                {
                  key: "/",
                  label: "Home",
                },
                {
                  key: "/about",
                  label: "About",
                },
                {
                  key: "/settings",
                  label: "Settings",
                },
                {
                  key: "/api-keys",
                  label: "API Keys",
                },
              ]}
            />
          </Col>
          <Col span={12} style={{ textAlign: "end" }}>
            <Button
              onClick={() => authStore.logout()}
              type="text"
              style={{ color: "white" }}
            >
              Log Out
            </Button>
          </Col>
        </Row>
      </Header>
      <AntdLayout>
        <Sider
          width={200}
          collapsed
          collapsedWidth={80}
          style={{ background: colorBgContainer }}
        >
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            style={{ height: "100%", borderRight: 0 }}
            items={items2}
          />
        </Sider>
        <AntdLayout style={{ padding: "0 24px 24px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item onClick={() => navigate("/")}>
              Home
            </Breadcrumb.Item>
            <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
            }}
          >
            {children}
          </Content>
        </AntdLayout>
      </AntdLayout>
    </AntdLayout>
  )
}

export default AdminLayout
