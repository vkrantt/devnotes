import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import { BASE_URL, toastConfig } from "../../utils/config";
import SoicalCard from "../../components/card/SoicalCard";
import { Link } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";

const MyWall = () => {
  const [allNotes, setAllNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [screenSize, setScreenSize] = useState("xl");
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${BASE_URL}/my-blogs`, {
        headers: {
          "Content-Type": "application/type",
          "auth-token": JSON.parse(localStorage.getItem("dev_token")),
        },
      })
      .then((data) => {
        setAllNotes(data.data.response);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    setScreenSize(getViewport());
  }, []);

  const getViewport = () => {
    const width = Math.max(
      document.documentElement.clientWidth,
      window.innerWidth || 0
    );
    if (width <= 576) return "xs";
    if (width <= 768) return "sm";
    if (width <= 992) return "md";
    if (width <= 1200) return "lg";
    return "xl";
  };

  const handleDelete = (note) => {
    const confirmation = window.confirm(
      "Are you sure!, This will delete permanently."
    );
    if (confirmation) {
      setIsDeleteLoading(true);
      const filteredNotes = allNotes.filter((item) => item._id !== note._id);
      setAllNotes(filteredNotes);
      axios
        .delete(`${BASE_URL}/deletenote/${note._id}`, {
          headers: {
            "Content-Type": "application/type",
            "auth-token": JSON.parse(localStorage.getItem("dev_token")),
          },
        })
        .then((data) => {
          toast.success(data.data.response, toastConfig);
          setIsDeleteLoading(false);
        });
    }
  };

  return (
    <Container>
      <Row>
        <Col lg={`${screenSize === "sm" || screenSize === "xs" ? 12 : 8}`}>
          <h5
            className={`text-blue text-underline d-flex justify-content-between align-items-end ${
              screenSize === "sm" || screenSize === "xs" ? "text-center " : ""
            }`}
          >
            <div className="text-decoration-underline">My wall</div>

            <Link
              className="btn bg-blue rounded-2 text-light"
              as={Link}
              to="/create"
            >
              Create New
            </Link>
          </h5>
          {isLoading ? (
            <div className="text-center">
              <Spinner animation="border" size="sm" />
            </div>
          ) : (
            allNotes.map((note) => (
              <div key={note._id}>
                <SoicalCard
                  note={note}
                  handleDelete={handleDelete}
                  isDeleteLoading={isDeleteLoading}
                />
              </div>
            ))
          )}
          {!isLoading && allNotes.length === 0 && (
            <center>No results found!</center>
          )}
        </Col>
      </Row>
      <Toaster />
    </Container>
  );
};

export default MyWall;
