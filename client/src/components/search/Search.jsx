import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import "./Search.css";
import { Link } from "react-router-dom";
import Loader from "../spinner/Loader";
const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 4000);
  }, [show]);

  return (
    <>
      <Form className="d-flex bg-light justify-content-between border-blue position-relative">
        <Form.Control
          type="search"
          placeholder="Search"
          className="rounded-0 shadow-none border-0"
          aria-label="Search"
          onClick={handleShow}
          onChange={(e) => setSearchQuery(e.target.value)}
          value={searchQuery}
        />
        <Button
          variant="none"
          className="rounded-0 shadow-none border text-light bg-blue "
        >
          Search
        </Button>
      </Form>

      <Modal show={show} onHide={handleClose} className="rounded-0 border-0">
        <Modal.Header>
          <Form.Control
            size="lg"
            type="text"
            placeholder="Search doc"
            className="p-3 shadow-none border-blue-lg rounded-3"
          />
        </Modal.Header>
        <Modal.Body className="search-body bg-light border-0">
          {/* not found */}
          {/* <center>No results found.</center> */}

          {/* Loading  */}
          {isLoading ? (
            <center>
              <Loader />
              <p>We are working on your query ... </p>
            </center>
          ) : (
            <div className="search-results">
              <p className="text-muted">Search results: </p>
              <div>
                <h6 className=" searchDataGrid bg-white p-3">
                  Search data text goes here.
                </h6>
                <h6 className=" searchDataGrid bg-white p-3">
                  Search data text goes here.
                </h6>
                <h6 className=" searchDataGrid bg-white p-3">
                  Search data text goes here.
                </h6>
                <h6 className=" searchDataGrid bg-white p-3">
                  Search data text goes here.
                </h6>
                <h6 className=" searchDataGrid bg-white p-3">
                  Search data text goes here.
                </h6>
                <h6 className=" searchDataGrid bg-white p-3">
                  Search data text goes here.
                </h6>
              </div>
              <center>
                <Link>See all 334</Link>
              </center>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Search;
