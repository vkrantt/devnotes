import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { BASE_URL, formatDate } from "../../utils/config";
import Loader from "../../components/spinner/Loader";
import SuggestionCard from "../../components/suggestionCard/SuggestionCard";

const DetailPage = () => {
  const params = useParams();
  const [noteDetail, setNoteDetail] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${BASE_URL}/detail/${params.id}`, {
        headers: {
          "Content-Type": "application/type",
        },
      })
      .then(function (response) {
        setNoteDetail(response.data.response);
        setLoading(false);
      })
      .catch(function (error) {
        setLoading(false);
      });
  }, [params.id]);

  return (
    <Container>
      {loading ? (
        <center>
          <Loader />
        </center>
      ) : (
        <Row>
          <Col lg="8" className="m-auto">
            <div>
              <h1 className="text-blue">{noteDetail.title}</h1>
              <p className="text-muted">
                Created on: <i>{formatDate(noteDetail.createdAt)}</i>
              </p>
            </div>

            <Row className="d-flex align-items-center justify-content-between">
              <Col lg="6">
                <SuggestionCard user={noteDetail.createdBy} />
              </Col>
            </Row>

            <p dangerouslySetInnerHTML={{ __html: noteDetail.description }}></p>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default DetailPage;
