import React, { useRef, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Input from "../../components/input/Input";
import axios from "axios";
import { BASE_URL } from "../../utils/config";
import toast, { Toaster } from "react-hot-toast";
import { toastConfig } from "../../utils/config";
import Loader from "../../components/spinner/Loader";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const form = useRef();
  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post(`${BASE_URL}/auth/forgotpassword`, { email })
      .then(function (response) {
        if (response.data.status === 400) {
          toast.error(response.data.response, toastConfig);
          setLoading(false);
        } else {
          const data = {
            service_id: process.env.REACT_APP_SERVICE_ID,
            template_id: process.env.REACT_APP_TEMPLATE_ID,
            user_id: process.env.REACT_APP_PUBLIC_ID,
            template_params: {
              firstName: response.data.firstName,
              url: response.data.url,
              reply_to: response.data.reply_to,
            },
          };

          axios({
            method: "post",
            url: "https://api.emailjs.com/api/v1.0/email/send",
            data: data,
          })
            .then((res) => {
              setLoading(false);
              toast.success(
                "Email sent, You can reset your password now.",
                toastConfig
              );
              setEmail("");
            })
            .catch((error) => console.log("error", error));
        }
        setLoading(false);
      })
      .catch(function (error) {
        setLoading(false);
        console.log(error);
      });
  };

  return (
    <Container>
      <Row>
        <Col lg="5" className="m-auto my-3">
          <h5 className="text-blue">Recover your password</h5>
          <Form ref={form}>
            <Form.Group className="mb-3">
              <Input
                type="email"
                name="email"
                onChange={handleChange}
                value={email}
                label="Email Address"
                placeholder="Enter your email address"
              />
              <Form.Text className="text-muted">
                We'll send you a email to reset your password.
              </Form.Text>
            </Form.Group>

            <Button
              variant="none"
              className="bg-blue rounded-0 px-4 text-light"
              type="submit"
              disabled={!email}
              onClick={handleSubmit}
            >
              {loading ? <Loader /> : "Send email"}
            </Button>
          </Form>
        </Col>
      </Row>
      <Toaster position="top-center" reverseOrder={false} />
    </Container>
  );
};

export default ForgotPassword;
