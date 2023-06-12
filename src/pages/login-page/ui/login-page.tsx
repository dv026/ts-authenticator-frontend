import { FC } from "react"
import { Col, Row, notification } from "antd"

import { AuthForm } from "@/widgets/auth-form/ui/auth-form"

import { styles } from "./styles"

export const LoginPage: FC = () => {
  return (
    <Row justify="center" align="middle" css={styles.loginPage}>
      <Col
        xs={{ span: 20 }}
        sm={{ span: 16 }}
        md={{ span: 10 }}
        lg={{ span: 8 }}
        xl={{ span: 6 }}
      >
        <AuthForm />
      </Col>
    </Row>
  )
}
