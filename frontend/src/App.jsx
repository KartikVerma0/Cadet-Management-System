import IndexPage from "./pages/indexPage/IndexPage"
import SignUpRouterPage from "./pages/signUpRouterPage/SignUpRouterPage"
import LoginPage from "./pages/loginPage/LoginPage"
import SignUpPage from "./pages/signupPage/SignUpPage"
import Dashboard from "./pages/dashboard/Dashboard"
import ResponsesListPoll from "./pages/responsesListPoll/ResponsesListPoll"
import ResponsesListEvent from "./pages/responseListEvent/ResponseListEvent"
import AccountPage from "./pages/accountPage/AccountPage"
import FourOFourPage from "./pages/404Page/FourOFourPage"
import StudyMaterialPage from "./pages/studyMaterialPage/StudyMaterialPage"

import { Analytics } from "@vercel/analytics/react"

import { Route, Routes } from "react-router-dom"

import permissionsMapping from "./permissionsMapping"
import useAuth from "./hooks/useAuth"

import "./App.css"

function App() {
  const { auth } = useAuth()


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
        {auth.accessToken && auth.permissions.includes(permissionsMapping.canSeePollResponses) && <Route path="/responses/polls/:dataId" element={<ResponsesListPoll />} />}
        {auth.accessToken && auth.permissions.includes(permissionsMapping.canSeeEventResponses) && <Route path="/responses/events/:dataId" element={<ResponsesListEvent />} />}
        {auth.accessToken && <Route path="/account" element={<AccountPage />} />}
        {auth.accessToken && <Route path="/studymaterial" element={<StudyMaterialPage />} />}
        <Route path="*" element={<FourOFourPage />} />
      </Routes>
    </>
  )
}

export default App
