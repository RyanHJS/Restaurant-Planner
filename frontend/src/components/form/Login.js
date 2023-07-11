import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
// import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";

import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../config/firebase";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [validated, setValidated] = useState(false);

  const navigate = useNavigate();

  const [user, setUser] = useState({});

  const isValid = () => {
    if (email.length === 0 || password.length === 0) {
      return false;
    }

    return true;
  };

  const handleSubmit = async (event) => {
    if (!isValid) {
      console.error("login failed");
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    event.preventDefault();

    try {
      await login();
      console.log("You have successfully logged in.");

      navigate("/home", { replace: true });
    } catch (error) {
      console.log(error);
      if (error.code === "auth/wrong-password") {
        alert("Invalid password");
      } else if (error.code === "auth/wrong-email") {
        alert("Invalid email");
      } else if (error.code === "auth/too-many-requests") {
        alert(
          "You have attempted to login too many times. Please try again later."
        );
      }
    }
  };

  const goBack = () => {
    navigate("/");
  };

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      console.log("login user: ", user);
    } catch (error) {
      throw error;
    }
  };

  return (
    <>
      <div className="w-100">
        <p className=" text-center fs-1 fw-bold mb-5">Login</p>
        <Form className="w-100" validated={validated}>
          {/* First row */}
          <Row className="mb-4">
            <Form.Group as={Col}>
              <Form.Label>Email</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Email address"
                defaultValue=""
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
          </Row>

          {/* Second row */}
          <Row className="mb-4">
            <Form.Group as={Col}>
              <Form.Label htmlFor="inputPassword">Password</Form.Label>
              <Form.Control
                type="password"
                id="inputPassword"
                placeholder="Password"
                aria-describedby="passwordHelpBlock"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
          </Row>

          {/* <div className="d-flex justify-content-center mt-5 mb-1">
          <Button className=" btn-lg text-center px-5 py-2 " type="submit">
            Login
          </Button>
        </div> */}
        </Form>
      </div>
      {/* <Button
            className=" text-center px-5 py-2 btn-danger"
            type="button"
            onClick={goBack}
          >
            Return
          </Button> */}

      <Stack gap={3} className="col-md-5 mx-auto mt-5">
        <Button
          className=" btn-lg text-center mt-4 "
          type="btn"
          onClick={handleSubmit}
        >
          Login
        </Button>

        <Button
          className=" text-center btn-danger  mt-2"
          type="button"
          onClick={goBack}
        >
          Return
        </Button>
      </Stack>
    </>
  );
}
