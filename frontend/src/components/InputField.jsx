import React from "react";

export default ({ onChange, type, name, value, required = true }) => {
  const handleChange = event => {
    onChange(event);
  };

  return (
    <input 
      onChange={handleChange}
      type={type}
      name={name}
      value={value}
      required={required}
    />
  );
};