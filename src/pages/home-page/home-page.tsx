import { Link } from "react-router-dom"
import { notification } from "antd"

import { styles } from "./styles"

export const HomePage = () => {
  const [api, contextHolder] = notification.useNotification()
  api.info({
    message: `Notification`,
    description: "description",
    placement: "topRight",
  })
  return (
    <div css={styles.page}>
      <div css={styles.cover}>
        <div css={styles.mainText}>
          Are you fed up <br /> with auth issues ?
        </div>
        <div css={styles.extraText}>There's a solution</div>
      </div>

      <div css={styles.suggestion}>
        <div css={styles.getStarted}>Get Started</div>
        <div>
          <Link to="/login">Create account</Link>
        </div>
        <div>npm i ts-authenticator-client</div>
      </div>
      <div css={styles.footer}>
        <div>
          <a href="https://www.npmjs.com/package/ts-authenticator-client">
            npm
          </a>
        </div>
      </div>
    </div>
  )
}
