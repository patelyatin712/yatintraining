import "./App.css";
import Login from "./pages/Login";
import { Navigate, Route, Router, Routes, useNavigate } from "react-router";
import Home from "./pages/Home";
import { ToastContainer, toast } from "react-toastify";
import AuthGuard from "./AuthGuard/AuthGuard";
function App() {
  const navigate = useNavigate();
  return (
    <>
      <ToastContainer />
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
        <Route element={<AuthGuard />}>
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
