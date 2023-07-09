import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import { BASE_URL } from "../../utils/config";
import SoicalCard from "../../components/card/SoicalCard";
import { Link } from "react-router-dom";

const MyWall = () => {
  const [allNotes, setAllNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [screenSize, setScreenSize] = useState("xl");

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

  return (
    <Container>
      <Row>
        <Col lg={`${screenSize === "sm" || screenSize === "xs" ? 12 : 8}`}>
          <h5
            className={`text-blue text-underline ${
              screenSize === "sm" || screenSize === "xs" ? "text-center " : ""
            }`}
          >
            <u>My wall</u>
          </h5>
          {isLoading ? (
            <div className="text-center">
              <Spinner animation="border" size="sm" />
            </div>
          ) : (
            allNotes.map((note) => (
              <div key={note._id}>
                <SoicalCard note={note} />
              </div>
            ))
          )}
        </Col>

        <Col
          lg="4"
          className={`position-relative ${
            screenSize === "sm" || screenSize === "xs" ? "d-none" : null
          }`}
        >
          <div className="position-fixed">
            <Link
              className="btn bg-blue rounded-0 text-light"
              as={Link}
              to="/create"
            >
              Create New
            </Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default MyWall;
