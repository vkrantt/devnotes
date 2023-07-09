import React from "react";

const AppLogo = ({ user }) => {
  return (
    <>
      {user ? (
        <div>
          <div style={{ fontSize: "18px" }}>devshare</div>
          <div style={{ fontSize: "10px" }}>{user?.username}</div>
        </div>
      ) : (
        <div>
          <div style={{ fontSize: "18px" }}>devshare</div>
        </div>
      )}
    </>
  );
};

export default AppLogo;
