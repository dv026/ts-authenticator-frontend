import { useEffect } from "react"
import { useUser } from "./app/contexts/user-context"
import { LoginPage } from "./pages/login-page/login-page"
import { HomePage } from "./pages/home-page/home-page"
import { Route, Routes, Navigate } from "react-router-dom"

function App() {
  const { user } = useUser()

  useEffect(() => {}, [])

  return (
    <div className="App">
      {user ? (
        <HomePage />
      ) : (
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/reset-password/:token"
            element={<LoginPage resetPasswordStep />}
          />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      )}
    </div>
  )
}

export default App
