import React from "react";
import { Button } from "react-bootstrap";

const SuggestionCard = ({ user }) => {
  return (
    <div className="d-flex align-items-center justify-content-between gap-3 bg-white p-2 ">
      <img
        className="rounded-pill border-3 border-blue"
        src={
          user?.userImage
            ? user?.userImage
            : "https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"
        }
        style={{ width: "50px", height: "50px" }}
        alt="img"
      />
      <div className="pt-3">
        <h6 className="text-blue">
          {user.username
            ? user.username
            : `${user?.firstName} ${user?.lastName}`}
        </h6>
        <p className="text-muted">
          Experts in "{user?.expertise ? user?.expertise : "UI"}"
        </p>
      </div>
      <Button className="bg-blue rounded-0 px-4 text-light mt-4 border-0 mb-3">
        view
      </Button>
    </div>
  );
};

export default SuggestionCard;
