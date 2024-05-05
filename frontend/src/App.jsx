import "./App.css";
import AccountPage from "./pages/accountPage/AccountPage";
import Dashboard from "./pages/dashboard/Dashboard";
import EnrolledCadets from "./pages/enrolledCadets/EnrolledCadets";
import FourOFourPage from "./pages/404Page/FourOFourPage";
import IndexPage from "./pages/indexPage/IndexPage";
import LoginPage from "./pages/loginPage/LoginPage";
import PendingExcusesPage from "./pages/pendingExcusesPage/PendingExcusesPage";
import ProbationCadets from "./pages/probationCadetsPage/ProbationCadets";
import ResponsesListEvent from "./pages/responseListEvent/ResponseListEvent";
import ResponsesListPoll from "./pages/responsesListPoll/ResponsesListPoll";
import SettingsPage from "./pages/settingsPage/SettingsPage";
import SignUpPage from "./pages/signupPage/SignUpPage";
import SignUpRouterPage from "./pages/signUpRouterPage/SignUpRouterPage";
import StudyMaterialPage from "./pages/studyMaterialPage/StudyMaterialPage";
import permissionsMapping from "./permissionsMapping";
import useAuth from "./hooks/useAuth";
import { Analytics } from "@vercel/analytics/react";
import { Route, Routes } from "react-router-dom";

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
        {auth.accessToken && auth.permissions.includes(permissionsMapping.canApprovePendingExcuses) && <Route path="/pendingexcuses" element={<PendingExcusesPage />} />}
        {auth.accessToken && auth.permissions.includes(permissionsMapping.canSeeEnrolledCadets) && <Route path="/enrolled/cadets" element={<EnrolledCadets />} />}
        {auth.accessToken && auth.permissions.includes(permissionsMapping.canSeeProbationCadets) && <Route path="/enrolled/probation" element={<ProbationCadets />} />}
        {auth.accessToken && <Route path="/account" element={<AccountPage />} />}
        {auth.accessToken && <Route path="/settings" element={<SettingsPage />} />}
        {auth.accessToken && <Route path="/studymaterial" element={<StudyMaterialPage />} />}
        <Route path="*" element={<FourOFourPage />} />
      </Routes>
    </>
  )
}

export default App
