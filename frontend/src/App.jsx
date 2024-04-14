import IndexPage from "./pages/indexPage/IndexPage"
import SignUpRouterPage from "./pages/signUpRouterPage/SignUpRouterPage"

import { Route, Routes } from "react-router-dom"

import "./App.css"

function App() {

  return (

    <Routes>
      <Route path="/" element={<IndexPage />} />
      <Route path="/signup" element={<SignUpRouterPage />} />
    </Routes>


  )
}

export default App
