import React from "react";
import MegaMenu from "./components/Header/MegaMenu";
import Footer from "./components/footer/Footer";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import MyAccount from "./pages/account/MyAccount";
import Create from "./pages/create/Create";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import ForgotPassword from "./pages/forgotpassword/ForgotPassword";
import ChangePassword from "./pages/changepassword/ChangePassword";
import ProtectedRoute from "./routes/ProtectedRoute";

const App = () => {
  return (
    <BrowserRouter>
      <div style={{ minHeight: "calc(100vh - 88px)" }}>
        <MegaMenu />
        <Routes>
          <Route path="/" element={<ProtectedRoute children={<Home />}/>} />
          <Route path="/my-account" element={<ProtectedRoute children={<MyAccount />}/>} />
          <Route path="/create" element={<ProtectedRoute children={<Create />}/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/change-password" element={<ChangePassword />} />

          <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
