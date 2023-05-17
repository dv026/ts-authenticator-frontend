import { Route, Routes, Navigate, useParams } from "react-router-dom"

import { LoginPage } from "./pages/login-page/ui/login-page"
import { HomePage } from "./pages/home-page/home-page"
import Layout from "./shared/layout/layout"
import { CreateUserPage } from "./pages/create-user/create-user"
import { useEffect } from "react"
import { useStore } from "./app/stores/root-store"
import { observer } from "mobx-react-lite"
import { DashboardPage } from "./pages/dashboard-page/dashboard-page"
import { SettingsPage } from "./pages/settings/settings-page"
import { ApiKeysPage } from "./pages/api-keys/api-keys-page"
import { notification } from "antd"

const App = observer(() => {
  // const { user } = useUser()
  const { authStore } = useStore()
  const { user, loading } = authStore
  const params = useParams()

  useEffect(() => {
    console.log(params)
    authStore.checkAuth()
  }, [])

  return (
    <div className="App">
      {loading ? (
        <div>loading...</div>
      ) : user ? (
        <Layout>
          <Routes>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/about" element={<div>about</div>} />
            <Route path="/user/create" element={<CreateUserPage />} />
            <Route path="/user/edit/:id" element={<CreateUserPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/api-keys" element={<ApiKeysPage />} />

            <Route path="*" element={<Navigate to="/about" />} />
          </Routes>
        </Layout>
      ) : (
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/reset-password/:token" element={<LoginPage />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      )}
    </div>
  )
})

export default App

// аксиос доделать так, чтобы работал с нотификациями как в e4f
