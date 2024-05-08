import "./App.css";
import AccountPage from "./pages/accountPage/AccountPage";
import AuthorizeCadetsPage from "./pages/authorizeCadetsPage/AuthorizeCadetsPage";
import CampDetailsPage from "./pages/campDetailsPage/CampDetailsPage";
import Dashboard from "./pages/dashboard/Dashboard";
import EnrolledCadets from "./pages/enrolledCadets/EnrolledCadets";
import EventsPage from "./pages/eventsPage/EventsPage";
import FourOFourPage from "./pages/404Page/FourOFourPage";
import IndexPage from "./pages/indexPage/IndexPage";
import LoginPage from "./pages/loginPage/LoginPage";
import NotificationsPage from "./pages/notificationsPage/NotificationsPage";
import PendingExcusesPage from "./pages/pendingExcusesPage/PendingExcusesPage";
import PollsPage from "./pages/pollsPage/PollsPage";
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
        {auth.accessToken && (
          auth.permissions.includes(permissionsMapping.canAuthorizeWingSenior) ||
          auth.permissions.includes(permissionsMapping.canAuthorizeProbationSenior)
        ) && <Route path="/authorize" element={<AuthorizeCadetsPage />} />}
        {auth.accessToken && <Route path="/events" element={<EventsPage />} />}
        {auth.accessToken && <Route path="/polls" element={<PollsPage />} />}
        {auth.accessToken && <Route path="/notifications" element={<NotificationsPage />} />}
        {auth.accessToken && <Route path="/account" element={<AccountPage />} />}
        {auth.accessToken && <Route path="/settings" element={<SettingsPage />} />}
        {auth.accessToken && <Route path="/studymaterial" element={<StudyMaterialPage />} />}
        {auth.accessToken && <Route path="/campdetails" element={<CampDetailsPage />} />}
        <Route path="*" element={<FourOFourPage />} />
      </Routes>
    </>
  )
}

export default App
