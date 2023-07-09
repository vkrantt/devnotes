import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Input from "../../components/input/Input";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../utils/config";
import toast, { Toaster } from "react-hot-toast";
import { toastConfig } from "../../utils/config";
import Loader from "../../components/spinner/Loader";

const ChangePassword = () => {
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("id");
  const [loading, setLoading] = useState(false);
  const [credentials, setCredentials] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [validationError, setValidationError] = useState(false);

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    if (credentials.newPassword !== credentials.confirmPassword) {
      setLoading(false);
      return setValidationError(true);
    } else {
      setLoading(false);
      setValidationError(false);
    }
    axios
      .post(`${BASE_URL}/auth/changepassword/${userId}`, {
        newPassword: credentials.confirmPassword,
      })
      .then(function (response) {
        if (response.data.status === 400) {
          toast.error(response.data.response, toastConfig);
        } else {
          toast.success(response.data.response, toastConfig);
          setTimeout(() => {
            window.location.pathname = "/";
          }, 500);
        }
      })
      .catch(function (error) {
        setLoading(false);
        toast.error(error.error.message, toastConfig);
        console.log(error);
      });
  };
  return (
    <Container>
      <Row>
        <Col lg="5" className="m-auto my-3">
          <h5 className="text-blue">Reset your password</h5>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Input
                type="password"
                label="New Password"
                placeholder="Enter your new password"
                name="newPassword"
                onChange={handleChange}
                value={credentials.newPassword}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Input
                type="password"
                label="Confirm Password"
                placeholder="Enter your password again"
                name="confirmPassword"
                onChange={handleChange}
                value={credentials.confirmPassword}
              />
            </Form.Group>

            <Button
              variant="none"
              className="bg-blue rounded-0 px-4 text-light"
              type="submit"
              onClick={handleSubmit}
              disabled={
                !credentials.newPassword || !credentials.confirmPassword
              }
            >
              {loading ? <Loader /> : "Reset password"}
            </Button>
          </Form>
          {validationError ? (
            <p className="text-danger">Passwords not matching.</p>
          ) : (
            ""
          )}
        </Col>
      </Row>
      <Toaster position="top-center" reverseOrder={false} />
    </Container>
  );
};

export default ChangePassword;
