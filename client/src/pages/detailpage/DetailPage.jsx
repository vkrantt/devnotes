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
      .get(`${BASE_URL}/detail/${params.id}`)
      .then(function (response) {
        setNoteDetail(response.data.response);
        setLoading(false);
      })
      .catch(function (error) {
        setLoading(false);
        console.log(error);
      });
  }, [params.id]);

  return (
    <Container>
      {loading ? (
        <Loader />
      ) : (
        <Row>
          <Col lg="10" className="m-auto">
            <div className="d-flex justify-content-between align-items-end">
                <div>
                <h1 className="text-blue">{noteDetail.title}</h1>
            <p className="text-muted">Created on: <i>{formatDate(noteDetail.createdAt)}</i></p>
                </div>
                <SuggestionCard/>
            </div>
            <p
              dangerouslySetInnerHTML={{ __html: noteDetail.description }}
            ></p>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default DetailPage;
