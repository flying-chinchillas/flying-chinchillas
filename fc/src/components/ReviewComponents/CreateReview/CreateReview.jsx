import "./CreateReview.css";
import * as React from "react";

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import StarReview from "../StarReview/StarReview";
import { Container, Row, Col, Form } from 'react-bootstrap';

export default function CreateReview(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Create a review
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <div class="form-floating mb-3">
        <input type="email" class="form-control" id="floatingInput" placeholder="title"></input>
        <label for="floatingInput">Title of your review</label>
      </div>
      <div class="star-review">
        {/* should be below the "title of your review" section  */}
        <StarReview></StarReview>
      </div>
      <div class="tag-checkboxes">
        <label class="tags-labels">Check all tags that apply to you:</label>
          <Container>
              <Row>
                <Col>
                  <Form.Check type="checkbox" label="Senior Citizens" />
                  <Form.Check type="checkbox" label="Children" />
                </Col>
                <Col>
                  <Form.Check type="checkbox" label="Women" />
                  <Form.Check type="checkbox" label="Race" />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Check type="checkbox" label="Solo Travel" />
                  <Form.Check type="checkbox" label="LGBTQ+" />
                </Col>
                <Col>
                  <Form.Check type="checkbox" label="Disabilities" />
                  <Form.Check type="checkbox" label="Religion" />
                </Col>
              </Row>
            </Container>
      </div>
      <div class="mb-3">
        <label class="textarea-label">Review comment</label>
        <textarea class="form-control" id="textarea-box" rows="3"></textarea>
      </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Cancel</Button>
        <Button onClick={props.onHide}>Submit</Button>

      </Modal.Footer>
    </Modal>
  );
}