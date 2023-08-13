import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Input from "../../components/input/Input";
import { Link } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../utils/config";
import Loader from "../../components/spinner/Loader";
import toast, { Toaster } from "react-hot-toast";
import { toastConfig } from "../../utils/config";
import { FcCheckmark } from "react-icons/fc";
import { IoCloseSharp } from "react-icons/io5";

const Signup = () => {
  const [seed] = useState(Math.floor(Math.random() * 5000));
  const [credentials, setCredentials] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    image: `https://avatars.dicebear.com/api/human/${seed}.svg`,
  });
  const [loading, setLoading] = useState(false);
  const [lowerCheck, setLowerCheck] = useState(false);
  const [upperCheck, setupperCheck] = useState(false);
  const [numberCheck, setNumberCheck] = useState(false);
  const [spacialCheck, setspacialCheck] = useState(false);
  const [lengthCheck, setLengthCheck] = useState(false);

  const lower = new RegExp("(?=.*[a-z])");
  const upper = new RegExp("(?=.*[A-Z])");
  const number = new RegExp("(?=.*[0-9])");
  const spacial = new RegExp("(?=.*[!@#$%^&*])");
  const length = new RegExp("(?=.{8,})");

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });

    if (e.target.name === "password") {
      if (e.target.value.match(lower)) {
        setLowerCheck(true);
      } else {
        setLowerCheck(false);
      }

      if (e.target.value.match(upper)) {
        setupperCheck(true);
      } else {
        setupperCheck(false);
      }

      if (e.target.value.match(number)) {
        setNumberCheck(true);
      } else {
        setNumberCheck(false);
      }

      if (e.target.value.match(spacial)) {
        setspacialCheck(true);
      } else {
        setspacialCheck(false);
      }

      if (e.target.value.match(length)) {
        setLengthCheck(true);
      } else {
        setLengthCheck(false);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post(`${BASE_URL}/auth/register`, credentials)
      .then(function (response) {
        if (response.data.status === 400) {
          toast.error(response.data.response, toastConfig);
        } else {
          toast.success(response.data.response, toastConfig);
          setCredentials({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
          });
        }
        setLoading(false);
      })
      .catch(function (error) {
        setLoading(false);
      });
  };
  return (
    <Container>
      <Row>
        <Col lg="5" className="m-auto my-3">
          <h5 className="text-blue">Sign up</h5>
          <Form>
            <Row>
              <Col lg="6">
                <Form.Group className="mb-3">
                  <Input
                    type="text"
                    id="firstName"
                    name="firstName"
                    onChange={handleChange}
                    value={credentials.firstName}
                    label="First name"
                    placeholder="First Name"
                  />
                </Form.Group>
              </Col>
              <Col lg="6">
                <Form.Group className="mb-3">
                  <Input
                    type="text"
                    id="lastName"
                    name="lastName"
                    onChange={handleChange}
                    value={credentials.lastName}
                    label="Last Name"
                    placeholder="Last Name"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Input
                type="email"
                id="email"
                name="email"
                onChange={handleChange}
                value={credentials.email}
                label="Email Address"
                placeholder="Enter your email address"
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Input
                type="password"
                id="password"
                name="password"
                onChange={handleChange}
                value={credentials.password}
                label="Password"
                placeholder="Enter your password"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Check type="checkbox" label="Remember me" />
            </Form.Group>
            <Button
              disabled={!credentials.email || !credentials.password}
              variant="none"
              className="bg-blue rounded-0 px-4 text-light"
              type="submit"
              onClick={handleSubmit}
            >
              {loading ? <Loader /> : "Sign Up"}
            </Button>
          </Form>

          <div className="d-flex justify-content-between align-items-center mt-3">
            <Link to="/login" className="text-blue">
              {" "}
              Already have an account?
            </Link>
          </div>
        </Col>
      </Row>

      <Row className="mb-5">
        <Col lg="5" className="m-auto rounded-2">
          <p>
            {lowerCheck ? <FcCheckmark /> : <IoCloseSharp />}
            <span className="mx-2">At least one lowercase character</span>
          </p>
          <p>
            {upperCheck ? <FcCheckmark /> : <IoCloseSharp />}
            <span className="mx-2">At least one uppercase character</span>
          </p>
          <p>
            {numberCheck ? <FcCheckmark /> : <IoCloseSharp />}
            <span className="mx-2">At least one number </span>
          </p>
          <p>
            {spacialCheck ? <FcCheckmark /> : <IoCloseSharp />}
            <span className="mx-2">At least one spacial character </span>
          </p>
          <p>
            {lengthCheck ? <FcCheckmark /> : <IoCloseSharp />}
            <span className="mx-2">At least 8 character </span>
          </p>
        </Col>
      </Row>

      <Toaster position="top-center" reverseOrder={false} />
    </Container>
  );
};

export default Signup;
