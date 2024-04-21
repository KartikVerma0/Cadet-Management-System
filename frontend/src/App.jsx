import IndexPage from "./pages/indexPage/IndexPage"
import SignUpRouterPage from "./pages/signUpRouterPage/SignUpRouterPage"
import LoginPage from "./pages/loginPage/LoginPage"
import SignUpPage from "./pages/signupPage/SignUpPage"
import Dashboard from "./pages/dashboard/Dashboard"
import RequireAuth from "./components/requireAuth/RequireAuth"

import { Analytics } from "@vercel/analytics/react"

import { Route, Routes } from "react-router-dom"

import "./App.css"

function App() {

  return (
    <>
      <Analytics />
      <Routes>
        <Route path={"/"} >
          <Route index element={<IndexPage />} />
          <Route path="login/:role" element={<LoginPage />} />
        </Route>
        <Route path="/signup" >
          <Route index={true} element={<SignUpRouterPage />} />
          <Route path=":role" element={<SignUpPage />} />
        </Route>

        <Route element={<RequireAuth />}>
          {/* if logged in then show dashboard */}
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
