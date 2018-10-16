import React from "react";

const Logout = props => {
  return (
    <button className="logout-button defaultButton" onClick={props.logMeOut}>
      Logout
    </button>
  );
};

export default Logout;
