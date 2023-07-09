import React, { useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  Row,
} from "react-bootstrap";
import Input from "../../components/input/Input";
import axios from "axios";
import { BASE_URL } from "../../utils/config";
import toast, { Toaster } from "react-hot-toast";
import { toastConfig } from "../../utils/config";
import Loader from "../../components/spinner/Loader";
import { useNavigate } from "react-router-dom";
import TextEditor from "../../components/text-editor/TextEditor";

const Create = () => {
  const navigate = useNavigate();
  const [note, setNote] = useState({
    title: "",
    description: "",
    socialShare: false,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setNote({
      ...note,
      [e.target.name]: e.target.value,
    });
  };

  const handleSocialShare = (e) => {
    setNote({
      ...note,
      socialShare: e.target.checked,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(note.description === ''){
      return alert('Please click on done button to add description.')
    }
    setLoading(true);
    axios
      .post(`${BASE_URL}/create`, note, {
        headers: {
          "auth-token": JSON.parse(localStorage.getItem("dev_token")),
        },
      })
      .then(function (response) {
        if (response.data.status === 400) {
          toast.error(response.data.response, toastConfig);
          setLoading(false);
        } else {
          toast.success(response.data.response, toastConfig);
          setLoading(false);
          setTimeout(() => {
            navigate("/");
          }, 1000);
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
        <Col lg="8" md="12" sm="12" className="m-auto mb-5">
          <Form>
            <Row className="mb-3">
              <h5 className="text-blue">Create new note</h5>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col}>
                <Input
                  label="Note title"
                  type="text"
                  name="title"
                  onChange={handleChange}
                  value={note.title}
                />
              </Form.Group>
            </Row>

            <TextEditor setNote={setNote} />

            <Form.Check
              type="switch"
              id="custom-switch"
              label="Social share"
              className="mt-2"
              onChange={handleSocialShare}
            />

            <Button
              variant="none"
              className="bg-blue rounded-0 px-4 text-light mt-4"
              type="submit"
              onClick={handleSubmit}
              disabled={!note.title}
            >
              {loading ? <Loader /> : "Post"}
            </Button>
          </Form>
        </Col>
      </Row>
      <Toaster position="top-center" reverseOrder={false} />
    </Container>
  );
};

export default Create;
