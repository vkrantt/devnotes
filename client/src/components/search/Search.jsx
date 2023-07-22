import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import "./Search.css";
import SearchModal from "../searchModal/SearchModal";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);

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

      <SearchModal show={show} setShow={setShow} />
    </>
  );
};

export default Search;
