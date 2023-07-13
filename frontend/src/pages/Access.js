import React from "react";
import Button from "react-bootstrap/esm/Button";

import { useNavigate } from "react-router-dom";

import { auth } from "../config/firebase";

function Access(props) {
  const navigate = useNavigate();

  const goToLoginPage = () => {
    navigate("/login");
  };

  const goToSignupPage = () => {
    navigate("/signup");
  };

  const isUserLoggedIn = () => {
    let user = auth.currentUser;

    if (user) {
      console.log("User is already logged in");
    } else {
      console.log("User is not logged in yet");
    }
  };

  // isUserLoggedIn();   // testing

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="w-100">
        <div className="align-items-center flex-column row">
          <div className="col-6 mb-5">
            <h2 className="display-2">Restaurant Planner</h2>
          </div>
          <div className="col-6 mt-4 mb-3">
            <h2>Hello there!</h2>
            <h4>
              You can make plans with your friends, coworkers, or for an event
              right now.
            </h4>
          </div>
          <div className="col-6 d-flex justify-content-center mb-3 mt-5  ">
            <Button
              type="button"
              className="btn btn-primary px-5 py-3 w-50"
              onClick={goToLoginPage}
            >
              Login
            </Button>
          </div>
          <div className="col-6 d-flex justify-content-center mb-3">
            <button
              type="button"
              className="btn btn-link mt-2 "
              onClick={goToSignupPage}
            >
              Don't have an account? Sign up now!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Access;
