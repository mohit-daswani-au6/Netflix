import React from "react";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";

const Footer = ({ extrastyle }) => {
  let style = null;
  extrastyle
    ? (style = {
      margin: "50px",
        ...extrastyle,
      })
    : (style = {
        margin: "50px",
      });
  return (
    <div style={style}>
      <br />
      <h2>Questions? Contact us.</h2>
      <br />
      <Row>
        <Col xs="3">
          <Link to="#" style={{ color: "gray" }}>Audio and Subtitles</Link>
        </Col>
        <Col xs="3">
          <Link to="#" style={{ color: "gray" }}>Help Center</Link>
        </Col>
        <Col xs="3">
          <Link to="#" style={{ color: "gray" }}>Gift Cards</Link>
        </Col>
        <Col xs="2">
          <Link to="#" style={{ color: "gray" }}>Invester Relations</Link>
        </Col>
      </Row>
      <br />
      <Row>
        <Col xs="3">
          <Link to="#" style={{ color: "gray" }}>Media Center</Link>
        </Col>
        <Col xs="3">
          <Link to="#" style={{ color: "gray" }}>Jobs</Link>
        </Col>
        <Col xs="3">
          <Link to="#" style={{ color: "gray" }}>Cookie Preferences</Link>
        </Col>
        <Col xs="2">
          <Link to="#" style={{ color: "gray" }}>Terms of use</Link>
        </Col>
      </Row>
      <br />
      <Row>
        <Col xs="3">
          <Link to="#" style={{ color: "gray" }}>Privacy Statement</Link>
        </Col>
      </Row>
      <br/>
    </div>
  );
};

export default Footer;
