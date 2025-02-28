import React from "react";
import Nav from "../components/Navbar";
import AuthContainer from "../components/AuthContainer";
import Footer from "../components/Footer";
import { Toaster } from "react-hot-toast";

function AuthScreen() {
  return (
    <div>
      <Nav />
      <div className="auth-section flex justify-center w-full pt-8">
        <AuthContainer />
      </div>
      <Footer />
    </div>
  );
}

export default AuthScreen;
