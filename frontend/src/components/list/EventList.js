import React, { useState } from "react";
// import Button from "react-bootstrap/esm/Button";
import Row from "react-bootstrap/Row";
import ListGroup from "react-bootstrap/ListGroup";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
// import CloseButton from "react-bootstrap/CloseButton";

export default function EventList({ isOwnHost, data }) {
  const handleEventClick = (item) => {
    console.log("clicked on event: " + item.event_name);
  };

  return (
    <ListGroup>
      <ListGroup.Item>
        <Container>
          <Row>
            <Col className="fw-bold">Event Title</Col>
            {isOwnHost ? <Col className="fw-bold">Host</Col> : null}
            {/* <Col className="fw-bold">Time Period</Col> */}
            <Col className="fw-bold">Total Participants</Col>
            {/* <Col className="fw-bold"></Col> */}
          </Row>
        </Container>
      </ListGroup.Item>
      {data.map((event, index) => {
        return (
          <ListGroup.Item
            key={index}
            action
            onClick={() => handleEventClick(event)}
          >
            <Container>
              <Row>
                <Col>{event.event_name}</Col>
                {isOwnHost ? (
                  <Col>{event.firstname + event.lastname}</Col>
                ) : null}
                {/* <Col>{event.timeframe}</Col> */}
                <Col>{event.total_participants}</Col>
                {/* <Col className=" justify-content-end">
                  <CloseButton />
                </Col> */}
              </Row>
            </Container>
          </ListGroup.Item>
        );
      })}
    </ListGroup>
  );
}
