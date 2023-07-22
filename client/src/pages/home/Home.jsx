import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row, Spinner } from "react-bootstrap";
import SoicalCard from "../../components/card/SoicalCard";
import SuggestionCard from "../../components/suggestionCard/SuggestionCard";
import { BASE_URL } from "../../utils/config";
import axios from "axios";
import { GiGlassCelebration } from "react-icons/gi";
import { LuSearch } from "react-icons/lu";
import SearchModal from "../../components/searchModal/SearchModal";

const Home = () => {
  const [allNotes, setAllNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [screenSize, setScreenSize] = useState("xl");
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    setIsLoading(true);
    axios.get(`${BASE_URL}`).then((data) => {
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
          <h5 className="d-flex justify-content-between align-items-end">
            <u>Social wall</u>
            {screenSize === "sm" ||
              (screenSize === "xs" && (
                <Button
                  variant="none"
                  className="border-blue rounded-pill"
                  onClick={handleShow}
                >
                  <div className="d-flex align-items-center">
                    <LuSearch /> Search
                  </div>
                </Button>
              ))}
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
            <h5 className="text-blue">
              <u>Suggestions</u>
            </h5>
            <div className="bg-blue d-flex flex-column gap-1 p-1 shadow">
              <SuggestionCard />
              <SuggestionCard />
              <SuggestionCard />
            </div>

            <div className="mt-4">
              <p>
                <h1>
                  <GiGlassCelebration />
                </h1>
                <span>
                  We have <br />
                  <b>1090</b> users and <br />
                  <b>240</b> live blogs right now!
                </span>
              </p>
            </div>
          </div>
        </Col>
      </Row>
      <SearchModal show={show} setShow={setShow} />
    </Container>
  );
};

export default Home;
