import IndexPage from "./pages/indexPage/IndexPage"
import SignUpRouterPage from "./pages/signUpRouterPage/SignUpRouterPage"
import LoginPage from "./pages/loginPage/LoginPage"
import SignUpPage from "./pages/signupPage/SignUpPage"
import { Analytics } from "@vercel/analytics/react"

import { Route, Routes } from "react-router-dom"

import "./App.css"

function App() {

  return (
    <>
      <Analytics />
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/signup" element={<SignUpRouterPage />} />
        <Route path="/login/:role" element={<LoginPage />} />
        <Route path="/signup/:role" element={<SignUpPage />} />
      </Routes>
    </>
  )
}

export default App
