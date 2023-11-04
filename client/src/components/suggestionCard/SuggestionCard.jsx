import React from "react";
// import { Button } from "react-bootstrap";

const SuggestionCard = ({ user }) => {
  return (
    <div className="d-flex align-items-center justify-content-between gap-2 bg-white pe-2 mt-3">
      <div className="d-flex align-items-center">
        <img
          className="rounded-pill border-3 border-blue me-2"
          src={
            user?.userImage
              ? user?.userImage
              : "https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"
          }
          style={{ width: "35px", height: "35px" }}
          alt="img"
        />
        <div className="">
          <div className="text-blue" style={{ fontSize: "14px" }}>
            {user?.username
              ? user?.username
              : `${user?.firstName} ${user?.lastName}`}
          </div>
          <div className="text-muted" style={{ fontSize: "14px" }}>
            Experts in "{user?.expertise ? user?.expertise : "UI"}"
          </div>
        </div>
      </div>

      {/* <Button className="bg-blue rounded-0 px-4 text-light mt-4 border-0 mb-3">
        view
      </Button> */}
    </div>
  );
};

export default SuggestionCard;
