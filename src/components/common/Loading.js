import React from "react";
import propTypes from "prop-types";
import "./Loading.css";

const Loading = props => {
  const { width, height } = props;
  return (
    <div
      className="Loading"
      style={{
        width,
        height
      }}
    ></div>
  );
};
Loading.propTypes = {
  width: propTypes.string,
  height: propTypes.string
};
Loading.defaultProps = {
  width: "18px",
  height: "18px"
};
export default Loading;
