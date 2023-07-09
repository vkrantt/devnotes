import React from "react";

const AppLogo = ({ user }) => {
  return (
    <>
      {user ? (
        <div>
          <div style={{ fontSize: "18px" }}>devshare</div>
          <div style={{ fontSize: "10px" }}>Vikrant Kumar</div>
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
