import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Input from "../../components/input/Input";
import toast, { Toaster } from "react-hot-toast";
import { BASE_URL, toastConfig } from "../../utils/config";
import axios from "axios";
import { getUserDetail } from "../../service/user";
import Loader from "../../components/spinner/Loader";

const MyAccount = () => {
  const [loading, setLoading] = useState(false);
  const [profileLoading, setProfileLoading] = useState(false);
  const loggedInUser = getUserDetail();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    expertise: "",
    existingPassword: "",
    newPassword: "",
    confirmPassword: "",
    city: "",
    state: "",
    userImage: "",
  });

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${BASE_URL}/auth/getUserById/${loggedInUser.id}`, {
        headers: {
          "auth-token": JSON.parse(localStorage.getItem("dev_token")),
        },
      })
      .then(function (response) {
        const data = response.data.response;
        setForm({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          expertise: data.expertise,
          city: data.city,
          state: data.state,
          userImage: data.userImage,
        });
        setLoading(false);
      })
      .catch(function (error) {
        setLoading(false);
      });
  }, [loggedInUser.id]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = form;

    if (!formData.newPassword || formData.newPassword === "") {
      delete formData.newPassword;
    }
    if (!formData.confirmPassword || formData.confirmPassword === "") {
      delete formData.confirmPassword;
    }
    if (!formData.city || formData.city === "") {
      delete formData.city;
    }
    if (!formData.state || formData.state === "") {
      delete formData.state;
    }
    if (!formData.expertise || formData.expertise === "") {
      delete formData.expertise;
    }

    setProfileLoading(true);
    axios
      .post(`${BASE_URL}/auth/updateUser/${loggedInUser.id}`, formData, {
        headers: {
          "auth-token": JSON.parse(localStorage.getItem("dev_token")),
        },
      })
      .then(function (response) {
        toast.success(response.data.response, toastConfig);
        setProfileLoading(false);
      })
      .catch(function (error) {
        setProfileLoading(false);
      });
  };

  const handleDelete = (e) => {
    const consent = window.confirm(
      "Are you sure! Do you really want to delete your account"
    );
    if (consent) {
      axios
        .post(
          `${BASE_URL}/auth/deleteUser/${loggedInUser.id}`,
          { isDelete: true },
          {
            headers: {
              "auth-token": JSON.parse(localStorage.getItem("dev_token")),
            },
          }
        )
        .then(function (response) {
          setLoading(false);
          toast.success(response.data.response, toastConfig);
          setTimeout(() => {
            localStorage.removeItem("dev_token");
            window.location.pathname = "/";
          }, 2000);
        })
        .catch(function (error) {
          setLoading(false);
        });
    }
  };

  return (
    <Container>
      <Row>
        <Col lg="8" md="12" sm="12" className="m-auto mb-5">
          <img
            src={form.userImage}
            alt={form.firstName}
            className="border-blue border-3 rounded-circle"
            style={{ width: "80px" }}
          />
          <Form>
            <Row className="mb-3">
              <u className="text-primary">Must details</u>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} lg="6" sm="12">
                <Input
                  label="First name"
                  type="text"
                  placeholder="Enter first name"
                  name="firstName"
                  onChange={handleChange}
                  value={form.firstName}
                />
              </Form.Group>

              <Form.Group as={Col} lg="6" sm="12">
                <Input
                  label="Last name"
                  type="text"
                  placeholder="Enter last name"
                  name="lastName"
                  onChange={handleChange}
                  value={form.lastName}
                />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} lg="6" sm="12">
                <Input
                  label="Email Address"
                  type="email"
                  placeholder="Enter email address"
                  name="email"
                  onChange={handleChange}
                  value={form.email}
                />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group as={Col} lg="6" sm="12">
                <Input
                  label="Experts in"
                  type="text"
                  placeholder="Experts in (Must)"
                  name="expertise"
                  onChange={handleChange}
                  value={form.expertise}
                />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <u className="text-primary">Change password ?</u>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} lg="6" sm="12">
                <Input
                  label="Existing password"
                  type="password"
                  placeholder="Enter existing password"
                  name="existingPassword"
                  onChange={handleChange}
                  value={form.existingPassword}
                />
              </Form.Group>

              <Form.Group as={Col} lg="6" sm="12">
                <Input
                  label="New Password"
                  type="password"
                  placeholder="Enter new password"
                  name="newPassword"
                  onChange={handleChange}
                  value={form.newPassword}
                />
              </Form.Group>
              <Form.Group as={Col} lg="6" sm="12">
                <Input
                  label="Confirm password"
                  type="password"
                  placeholder="Enter password again"
                  name="confirmPassword"
                  onChange={handleChange}
                  value={form.confirmPassword}
                />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <u className="text-primary">Optional</u>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} lg="6" md="6" sm="12">
                <Input
                  label="City"
                  type="text"
                  placeholder="Enter city"
                  name="city"
                  onChange={handleChange}
                  value={form.city}
                />
              </Form.Group>

              <Form.Group as={Col} lg="6" md="6" sm="12">
                <Input
                  label="State"
                  type="text"
                  placeholder="Enter State"
                  name="state"
                  onChange={handleChange}
                  value={form.state}
                />
              </Form.Group>
            </Row>

            <Form.Check // prettier-ignore
              type="switch"
              id="custom-switch"
              label="Set every post socially shared by default"
            />

            <Button
              variant="none"
              className="bg-blue rounded-2 px-4 text-light mt-4"
              type="submit"
              onClick={handleSubmit}
            >
              {profileLoading ? <Loader /> : "Update profile"}
            </Button>
          </Form>

          <Row className="mt-5">
            <hr />
            <div className="mb-3">
              <u className="text-danger">Danger area</u>
            </div>
            <div>
              <p className="text-danger">
                Note: After deleting you cannot recover this account back. Good
                luck!
              </p>
            </div>
            <Col>
              <Button
                variant="none"
                className="bg-danger rounded-2 px-4 text-light"
                type="button"
                onClick={handleDelete}
              >
                {loading ? <Loader /> : "Delete account"}
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>

      <Toaster position="top-center" reverseOrder={false} />
    </Container>
  );
};

export default MyAccount;
