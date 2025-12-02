import Login from "./pages/Login";
import { Navigate, Route, Router, Routes, useNavigate } from "react-router";
import Home from "./pages/Home";
import { ToastContainer, toast } from "react-toastify";
import AuthGuard from "./AuthGuard/AuthGuard";
import DashBoard from "./pages/Dashboard";
import Navbar from "./pages/Navbar";
function App() {
  return (
    <>
      <ToastContainer />
      {/* <Navbar /> */}
      {} <Navbar />
      <Routes>
        <Route
          path="/login"
          element={
            localStorage.getItem("accessToke") ? (
              <Navigate to="/home" />
            ) : (
              <Login />
            )
          }
        />

        <Route path="/dashboard" element={<DashBoard />} />
        {/* <Route path="/navbar" element={<Navbar />} /> */}

        <Route

        // element={<AuthGuard />}
        >
          <Route
            path="/*"
            element={
              <Routes>
                <Route path="/home" element={<Home />} />
              </Routes>
            }
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
