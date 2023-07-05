import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

const Input = ({ name, value, onChange, label, type, placeholder, style }) => {
  const [isShow, setIsShow] = useState(false);

  return (
    <>
      <div className="d-flex  justify-content-between align-items-center">
        <Form.Label>{label}</Form.Label>

        {type === "password" && (
          <Button
            style={{ right: "18px", top: "17px" }}
            className=" p-0 text-blue "
            variant="white"
            onClick={() => setIsShow(!isShow)}
          >
            {isShow ? "Hide" : "Show"}
          </Button>
        )}
      </div>

      <Form.Control
        name={name}
        onChange={onChange}
        value={value}
        type={type === "password" ? (isShow ? "text" : "password") : type}
        placeholder={placeholder}
        style={style}
        className="position-relative border-muted rounded-0 shadow-sm border-2"
      />
    </>
  );
};

export default Input;
