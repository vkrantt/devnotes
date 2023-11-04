import React from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Input from "../../components/input/Input";
import Loader from "../../components/spinner/Loader";
import { BiTrashAlt } from "react-icons/bi";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { BASE_URL, toastConfig } from "../../utils/config";
import toast, { Toaster } from "react-hot-toast";

const Feature = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);
  const [featuredUsers, setFeaturedUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  useEffect(() => {
    if (!searchTerm) setUsers([]);
    const debounceTimer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 1000);

    return () => {
      clearTimeout(debounceTimer);
    };
  }, [searchTerm]);

  useEffect(() => {
    if (debouncedSearchTerm) {
      searchUser();
    }
  }, [debouncedSearchTerm]);

  function searchUser() {
    setLoading(true);
    axios
      .get(`${BASE_URL}/auth?search=${debouncedSearchTerm}`, {
        headers: {
          "Content-Type": "application/type",
          "auth-token": JSON.parse(localStorage.getItem("dev_token")),
        },
      })
      .then((data) => {
        setUsers(data.data);
        setLoading(false);
      });
  }
  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCreateFeatureAccount = (user) => {
    const { firstName, lastName, email, userImage, expertise } = user;
    const formData = { firstName, lastName, email, userImage, expertise };
    axios
      .post(`${BASE_URL}/featured/adduser`, formData, {
        headers: {
          "auth-token": JSON.parse(localStorage.getItem("dev_token")),
        },
      })
      .then(function (response) {
        if (response.data.status === 200) {
          toast.success("User Added", toastConfig);
          setFeaturedUsers((prevFeaturedUsers) => [
            ...prevFeaturedUsers,
            response.data.response,
          ]);
        } else {
          toast.success(response.data.response, toastConfig);
        }
      });
  };

  const handleDelete = (userId) => {
    setFeaturedUsers(featuredUsers.filter((user) => user._id !== userId));
    axios
      .delete(`${BASE_URL}/featured/deleteUser`, {
        params: { id: userId },
        headers: {
          "auth-token": JSON.parse(localStorage.getItem("dev_token")),
        },
      })
      .then((response) => {
        toast.success("User Deleted", toastConfig);
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
      });
  };

  useEffect(() => {
    axios
      .get(`${BASE_URL}/featured`, {
        headers: {
          "Content-Type": "application/type",
        },
      })
      .then((data) => {
        setFeaturedUsers(data.data.response);
      });
  }, []);
  return (
    <Container>
      <Toaster />
      <Row>
        <Col lg="8" md="12" sm="12" className="m-auto mb-5">
          <span className="text-primary">
            <u>Featured</u>
          </span>

          <div className="mt-4">
            <Form.Group>
              <Input
                label="Search"
                type="text"
                placeholder="Email address"
                name="Search"
                onChange={handleInputChange}
                value={searchTerm}
              />
            </Form.Group>

            {searchTerm && (
              <div className="bg-light shadow-sm p-2">
                <div className="text-center">{loading && <Loader />}</div>
                <div>
                  {!loading &&
                    users?.length > 0 &&
                    users?.map((user, i) => (
                      <h6
                        onClick={() => handleCreateFeatureAccount(user)}
                        key={user._id}
                        className="mb-2 bg-white p-2"
                        style={{ cursor: "pointer" }}
                      >
                        {user.firstName} {user.lastName} - {user.email}
                      </h6>
                    ))}
                </div>
              </div>
            )}

            <div className="my-4">
              <span className="text-primary my-2">
                <u>Featured users</u>
              </span>
              {featuredUsers?.map((user, i) => (
                <div key={i} className="my-2 bg-light">
                  <div className="d-flex justify-content-between align-items-center p-3">
                    {user.firstName} {user.lastName} - {user.email}
                    <div className="d-flex align-items-center">
                      <Button
                        variant="outline-dark"
                        size="sm"
                        className="btn p-0 me-2"
                        onClick={() => handleDelete(user._id)}
                      >
                        <div className="d-flex align-items-center border-blue px-2 py-1">
                          <BiTrashAlt /> DELETE
                        </div>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Feature;
