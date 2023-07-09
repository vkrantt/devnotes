import React, { useState } from "react";
import {
  Button,
  Col,
  Container,
  FloatingLabel,
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
import { BiImageAlt } from "react-icons/bi";

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

  const handleHeading = (e) => {
    setNote({
      description:
        (note.description += `<${e.target.value}>  </${e.target.value}>`),
    });
  };

  // handle typo here
  const handleTypo = (type) => {
    switch (type) {
      case "bold":
        setNote({
          description: (note.description += "<br>  </br>"),
        });
        break;
      case "italic":
        setNote({
          description: (note.description += "<i>  </i>"),
        });
        break;
      case "underline":
        setNote({
          description: (note.description += "<u>  </u>"),
        });
        break;
      case "code":
        setNote({
          description: (note.description += "<code>  </code>"),
        });
        break;
      case "image":
        setNote({
          description: (note.description += '<img src="  "/>'),
        });
        break;
      case "break":
        setNote({
          description: (note.description += "<br/>"),
        });
        break;
      case "link":
        setNote({
          description: (note.description += '<a href="  ">  </a>'),
        });
        break;
      default:
        break;
    }
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

            <div className="d-flex align-items-center mb-3 flex-wrap">
              <Button
                variant="none"
                className="rounded-0 me-1 btn-sm btn-light"
                onClick={() => handleTypo("bold")}
              >
                B
              </Button>
              <Button
                variant="none"
                className="rounded-0 me-1 btn-sm btn-light"
                onClick={() => handleTypo("italic")}
              >
                I
              </Button>
              <Button
                variant="none"
                className="rounded-0 me-1 btn-sm btn-light"
                onClick={() => handleTypo("underline")}
              >
                U
              </Button>
              <Button
                variant="none"
                className="rounded-0 me-1 btn-sm btn-light"
                onClick={() => handleTypo("code")}
              >
                Code
              </Button>
              <Form.Select
                onChange={handleHeading}
                aria-label="Default select example"
                className="w-25 me-1 rounded-0 bg-light border-0 p-0 py-1 px-1 shadow-none"
              >
                <option>Heading</option>
                <option value="h1">H1</option>
                <option value="h2">H2</option>
                <option value="h3">H3</option>
                <option value="h4">H4</option>
                <option value="h5">H5</option>
                <option value="h6">H6</option>
              </Form.Select>

              <Button
                variant="none"
                className="rounded-0 me-1 btn-sm btn-light"
                onClick={() => handleTypo("image")}
              >
                <BiImageAlt />
              </Button>
              <Button
                variant="none"
                className="rounded-0 me-1 btn-sm btn-light"
                onClick={() => handleTypo("break")}
              >
                Break
              </Button>
              <Button
                variant="none"
                className="rounded-0 me-1 btn-sm btn-light"
                onClick={() => handleTypo("link")}
              >
                Link
              </Button>
            </div>
            <FloatingLabel label="Description">
              <Form.Control
                as="textarea"
                placeholder="Leave a comment here"
                style={{ height: "500px" }}
                className="border-muted rounded-0 shadow-sm border-2"
                name="description"
                onChange={handleChange}
                value={note.description}
              />
            </FloatingLabel>

            <Form.Check // prettier-ignore
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
              disabled={!note.title || !note.description}
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
