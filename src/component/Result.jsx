import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const handlePage = () => {
    navigate("/");
  };
  return (
    <>
      <div
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div>
          <p>Your Result: {location.state?.correct}</p>
          <button onClick={handlePage} className="btn btn-info" type='button'>Restart Quiz</button>
        </div>
      </div>
    </>
  );
};

export default Result;
