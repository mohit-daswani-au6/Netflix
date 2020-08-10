  
import React from 'react';
import "../styles/Button.css";
const Button = ({ value, type = "Submit", background}) => (
    <input type={type} style={{ background}} className="Button" value={value} />
  );
  
  export default Button;