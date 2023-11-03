import React from "react";
import { Container } from "react-bootstrap";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <Container fluid className="bg-blue">
      <Container className="bg-blue text-light d-flex justify-content-between py-4">
        <p>1.0.1</p>
        <p>
          &copy; {currentYear} <u>devshare</u>
        </p>
        <p>Twitter</p>
      </Container>
    </Container>
  );
};

export default Footer;
