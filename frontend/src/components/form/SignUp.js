import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";

import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";

// My imports
import { auth } from "../../config/firebase";

export default function Signup() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");

  const [validated, setValidated] = useState(false);

  const navigate = useNavigate();

  const [user, setUser] = useState({});

  //   onAuthStateChanged(auth, (currentUser) => {
  //     setUser(currentUser);
  //   });

  const signup = async () => {
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password1);

      const signupInfo = {
        firstname: firstname,
        lastname: lastname,
        email: email,
        password1: password1,
        password2: password2,
      };
      console.log("sign up info: ", signupInfo);

      console.log("user: ", user);
    } catch (err) {
      throw err;
    }
  };

  const handleSubmit = async (event) => {
    if (!isValid) {
      console.error("Sign up form validation failed");
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    event.preventDefault();
    try {
      await signup();
      // todo: create a user in the backend
      console.log("You have successfully signed up.");
      navigate("/login", { replace: true });
    } catch (error) {
      console.log(error);
      if (error.code === "auth/email-already-in-use") {
        alert("Invalid email: email already exist.");
      }
    }
  };

  const isValid = () => {
    if (
      firstname.length === 0 ||
      lastname.length === 0 ||
      email.length === 0 ||
      password1.length === 0 ||
      password2.length === 0
    ) {
      return false;
    }

    if (password1 !== password2) {
      return false;
    }

    return true;
  };

  return (
    <Form validated={validated} onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="validationCustomFirstname">
          {/* First name */}
          <Form.Label>First Name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="First name"
            defaultValue=""
            onChange={(e) => setFirstname(e.target.value)}
          />
          {/* <Form.Control.Feedback></Form.Control.Feedback> */}
        </Form.Group>

        {/* Last name */}
        <Form.Group as={Col} controlId="validationCustomLastname">
          <Form.Label>Last name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Last name"
            defaultValue=""
            onChange={(e) => setLastname(e.target.value)}
          />
          {/* <Form.Control.Feedback></Form.Control.Feedback> */}
        </Form.Group>
      </Row>

      {/* Second row */}
      <Row className="mb-3">
        <Form.Group as={Col} controlId="validationCustomEmail">
          {/* Email */}
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

      {/* Third row */}
      <Row className="mb-3">
        <Form.Label htmlFor="inputPassword1">Password</Form.Label>
        <Form.Control
          type="password"
          id="inputPassword1"
          aria-describedby="passwordHelpBlock"
          onChange={(e) => setPassword1(e.target.value)}
        />
        <Form.Text id="passwordHelpBlock" muted>
          Your password must be 6-20 characters long, contain letters and
          numbers, and must not contain spaces, special characters, or emoji.
        </Form.Text>
      </Row>

      {/* Fourth row */}
      <Row className="mb-3">
        <Form.Label htmlFor="inputPassword2">Confirm Password</Form.Label>
        <Form.Control
          type="password"
          id="inputPassword2"
          aria-describedby="passwordHelpBlock"
          onChange={(e) => setPassword2(e.target.value)}
        />
      </Row>
      <Button type="submit">Create</Button>
    </Form>
  );
}
