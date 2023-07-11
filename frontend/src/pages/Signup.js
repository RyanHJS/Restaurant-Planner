import React from "react";

import SignupForm from "../components/form/SignUpForm";

function Signup(props) {
  return (
    <div className="container d-flex p-2 align-items-center justify-content-center min-vh-100  ">
      <div className="p-5 w-75 rounded-2 bg-light shadow-sm">
        <SignupForm />
      </div>
    </div>
  );
}

export default Signup;
