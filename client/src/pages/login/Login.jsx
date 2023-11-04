import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Input from "../../components/input/Input";
import { Link } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../utils/config";
import toast, { Toaster } from "react-hot-toast";
import { toastConfig, storageService } from "../../utils/config";
import Loader from "../../components/spinner/Loader";
import { FcCheckmark } from "react-icons/fc";
import { IoCloseSharp } from "react-icons/io5";

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
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
      .post(`${BASE_URL}/auth/login`, credentials)
      .then(function (response) {
        if (response.data.status === 400) {
          toast.error(response.data.response, toastConfig);
          setLoading(false);
        } else {
          toast.success(response.data.response, toastConfig);
          storageService.set("dev_token", response.data.token);
          setTimeout(() => {
            window.location.pathname = "/";
          }, 500);
          setLoading(false);
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
          <h5 className="text-blue">Login to continue</h5>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
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

            <Form.Group className="mb-3" controlId="formBasicPassword">
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

            <Button
              disabled={
                !credentials.email ||
                !credentials.password ||
                !lowerCheck ||
                !upperCheck ||
                !numberCheck ||
                !spacialCheck ||
                !lengthCheck
              }
              variant="none"
              className="bg-blue rounded-0 px-4 text-light"
              type="submit"
              onClick={handleSubmit}
            >
              {loading ? <Loader /> : "Log In"}
            </Button>
          </Form>

          <div className="d-flex justify-content-between align-items-center mt-3">
            <Link to="/signup" className="text-blue">
              Don't have any account?
            </Link>
            <Link to="/forgot-password" className="text-blue">
              Forgot account?
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

export default Login;
