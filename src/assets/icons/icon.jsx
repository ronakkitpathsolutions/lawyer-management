import React from "react";

const Icon = ({ component, size = 16, stroke = 2, ...props }) => {
  return React.createElement(component, { size, stroke, ...props });
};

export default Icon;
