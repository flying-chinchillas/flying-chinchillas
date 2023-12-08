import "./CreateReview.css";
import * as React from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import StarReview from "../StarReview/StarReview";
import { Container, Row, Col, Form } from 'react-bootstrap';
import { getDatabase, ref, set, push } from "firebase/database";
import { getAuth } from "firebase/auth";

export default function CreateReview(props) {
  const tags = ['senior-citizens', 'children', 'solo-travel', 'lgbtq+', 'women', 'race', 'disabilities', 'religion']
  const [rating, setRating] = React.useState(0);
  const auth = getAuth().currentUser;
  const userId = auth.uid;

  const handleRate = (newRating) => {
    setRating(newRating-1);
  };

  function submitReview(e){
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const title = formData.get('title');
    const desc = formData.get('desc')
    let checked_tags = tags.filter(tag => formData.get(tag));
    const likes = 0;
    const dislikes = 0;
    let currentDate = new Date();
    let day = currentDate.getDate();
    let month = currentDate.getMonth() + 1; // getMonth() returns month index starting from 0
    let year = currentDate.getFullYear();
    const date = `${month}/${day}/${year}`;
    const db = getDatabase();

    const reviewData = {
      country: props.country,
      date: date,
      title: title,
      rating: rating,
      tags: checked_tags,
      desc: desc,
      likes: likes,
      dislikes: dislikes
    };
    const newReviewRef = push(ref(db, 'review/'));
    set(newReviewRef, reviewData);
    
    const newUserReviewRef = push(ref(db, 'user/' + userId + '/reviews/'));
    set(newUserReviewRef, newReviewRef.key);
    const newCountryReviewRef = push(ref(db, `country/${props.country}/reviews/`));
    set(newCountryReviewRef, newReviewRef.key);

    console.log("review data sent to firebase");
    props.onHide();
  }

  return (

    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <form id="submitForm" onSubmit={submitReview}>

        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Create a review for {props.country}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="form-floating mb-3">
              <input name="title" type="text" class="form-control" id="floatingInput" placeholder="title"></input>
              <label for="floatingInput">Title of your review</label>
            </div>
            <div className="star-review">
              {/* star review should be below the "title of your review" section  */}
              <StarReview onRate={handleRate}></StarReview>
            </div>

            <div className="tag-checkboxes">
              <label class="tags-labels">Check all tags that apply to you:</label>
                <Container>
                  <Row>
                    <Col>
                      <Form.Check name="senior-citizens" type="checkbox" label="Senior Citizens" />
                      <Form.Check name="children" type="checkbox" label="Children" />
                      <Form.Check name="solo-travel" type="checkbox" label="Solo Travel" />
                      <Form.Check name="lgbtq+" type="checkbox" label="LGBTQ+" />
                    </Col>
                    <Col>
                      <Form.Check name="women" type="checkbox" label="Women" />
                      <Form.Check name="race" type="checkbox" label="Race" />
                      <Form.Check name="disabilities" type="checkbox" label="Disabilities" />
                      <Form.Check name="religion" type="checkbox" label="Religion" />
                    </Col>
                  </Row>
                </Container>
            </div>

            <div className="mb-3">
              <label class="textarea-label">Review description</label>
              <textarea name="desc" class="form-control" id="textarea-box" rows="3"></textarea>
            </div>
        
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={props.onHide}>Cancel</Button>
              <Button type="submit" form="submitForm">Submit</Button>
            </Modal.Footer>
          </form>
        </Modal>
  );
}