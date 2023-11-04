import React from "react";
import { Container } from "react-bootstrap";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <Container fluid className="bg-blue">
      <Container className="bg-blue text-light d-flex justify-content-between pt-3">
        <p>1.0.1</p>
        <div>
          &copy; {currentYear}{" "}
          <span className="text-decoration-underline">devshare</span>
        </div>
        <p>Twitter</p>
      </Container>
    </Container>
  );
};

export default Footer;
