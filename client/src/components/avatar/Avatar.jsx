import React, { useState } from "react";
import { getUserDetail } from "../../service/user";

const Avatar = (userImage) => {
  const [user] = useState(getUserDetail());
  return (
    <img
      className={`rounded-pill border-3 border-blue  ${
        user.isAdmin ? "border-success" : ""
      } `}
      src="https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"
      style={{ width: "30px", height: "30px" }}
      alt="im"
    />
  );
};

export default Avatar;
