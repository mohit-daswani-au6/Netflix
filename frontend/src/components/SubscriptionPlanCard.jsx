import React from "react";
import {
  Button,
  CardText,
  CardTitle,
  Card,
  CardBody,
} from "reactstrap";
import "../styles/planCard.css";

const SubscriptionPlanCard = ({ item,handleClick }) => {
  return (
        <Card key={item.type} className="pricingCard" body inverse color="danger">
          <CardBody>
            <CardTitle style={{ fontSize: "xx-large", fontWeight: "700" }}>
              {item.type}
            </CardTitle>
            <CardTitle style={{ fontSize: "65px", fontWeight: "700" }}>{item.price}$</CardTitle>
            <CardText>{item.features}</CardText>
            <CardText>{item.details}</CardText>
            <Button onClick={handleClick} value={item.type} >Select</Button>
          </CardBody>
        </Card>
  );
};

export default SubscriptionPlanCard;
