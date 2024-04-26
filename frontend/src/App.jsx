import IndexPage from "./pages/indexPage/IndexPage"
import SignUpRouterPage from "./pages/signUpRouterPage/SignUpRouterPage"
import LoginPage from "./pages/loginPage/LoginPage"
import SignUpPage from "./pages/signupPage/SignUpPage"
import Dashboard from "./pages/dashboard/Dashboard"
import ResponsesList from "./components/responsesList/ResponsesList"
import FourOFourPage from "./pages/404Page/FourOFourPage"

import { Analytics } from "@vercel/analytics/react"

import { Route, Routes } from "react-router-dom"

import "./App.css"

function App() {

  return (
    <>
      <Analytics />
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/login/:role" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpRouterPage />} />
        <Route path="/signup/:role" element={<SignUpPage />} />
        {/* if logged in then show dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/responses/:section/:dataId" element={<ResponsesList />} />
        <Route path="*" element={<FourOFourPage />} />
      </Routes>
    </>
  )
}

export default App
