import React from "react";

import LoginForm from "../components/form/Login";

function Signup(props) {
  return (
    <div className="container d-flex p-2 align-items-center justify-content-center min-vh-100  ">
      <div className="p-5 w-50 rounded-2 bg-light shadow-sm">
        <LoginForm />
      </div>
    </div>
  );
}

export default Signup;
