import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";

import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../config/firebase";

export default function Login() {
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

      navigate("/", { replace: true });
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

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      console.log("login user: ", user);
    } catch (error) {
      throw error;
    }
  };

  return (
    <Form validated={validated} onSubmit={handleSubmit}>
      {/* First row */}
      <Row className="mb-3">
        <Form.Group as={Col} controlId="validationCustomEmail">
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
      <Row className="mb-3">
        <Form.Label htmlFor="inputPassword">Password</Form.Label>
        <Form.Control
          type="password"
          id="inputPassword"
          aria-describedby="passwordHelpBlock"
          onChange={(e) => setPassword(e.target.value)}
        />
      </Row>

      <Button type="submit">Login</Button>
    </Form>
  );
}
