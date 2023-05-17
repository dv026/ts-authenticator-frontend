import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import { UserProvider } from "./app/contexts/user-context"
import { BrowserRouter } from "react-router-dom"
import { Global } from "@emotion/react"
import { styles } from "./styles"
// import { Modal } from "./shared/modal/modal"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // <React.StrictMode>
  <BrowserRouter>
    <Global styles={styles} />
    {/* <Modal /> */}
    <UserProvider>
      <App />
    </UserProvider>
  </BrowserRouter>
  // </React.StrictMode>
)
