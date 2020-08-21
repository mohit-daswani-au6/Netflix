import React from "react";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";

const Footer = ({ extrastyle }) => {
  let style = null;
  extrastyle
    ? (style = {
        ...extrastyle,
        margin: "50px",
      })
    : (style = {
        margin: "50px",
      });
console.log(style)
  return (
    <div style={style}>
      <hr />
      <br />
      <h2>Questions? Contact us.</h2>
      <br />
      <Row>
        <Col xs="2">
          <Link style={{ color: "gray" }}>Audio and Subtitles</Link>
        </Col>
        <Col xs="2">
          <Link style={{ color: "gray" }}>Help Center</Link>
        </Col>
        <Col xs="2">
          <Link style={{ color: "gray" }}>Gift Cards</Link>
        </Col>
        <Col xs="2">
          <Link style={{ color: "gray" }}>Invester Relations</Link>
        </Col>
      </Row>
      <br />
      <Row>
        <Col xs="2">
          <Link style={{ color: "gray" }}>Media Center</Link>
        </Col>
        <Col xs="2">
          <Link style={{ color: "gray" }}>Jobs</Link>
        </Col>
        <Col xs="2">
          <Link style={{ color: "gray" }}>Cookie Prefferences</Link>
        </Col>
        <Col xs="2">
          <Link style={{ color: "gray" }}>Terms of use</Link>
        </Col>
      </Row>
      <br />
      <Row>
        <Col xs="2">
          <Link style={{ color: "gray" }}>Privacy Statement</Link>
        </Col>
      </Row>
    </div>
  );
};

export default Footer;
