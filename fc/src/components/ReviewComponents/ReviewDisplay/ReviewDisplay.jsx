import { useEffect, useState } from 'react';
import { getDatabase, ref, get, child } from "firebase/database";
import StarReview from '../StarReview/StarReview';
import UpvoteButton from '../../ReviewComponents/UpvoteButton/UpvoteButton';

function ReviewDisplay({ country }) {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const db = getDatabase();
        const countryRef = ref(db, `country/${country}/reviews`);

        get(countryRef).then((snapshot) => {
            if (snapshot.exists()) {
                const reviewIds = Object.values(snapshot.val());
                const reviewPromises = reviewIds.map(id => 
                    get(child(ref(db, 'review'), id))
                );

                Promise.all(reviewPromises).then(reviewSnapshots => {
                    const reviews = reviewSnapshots.map(snap => snap.val());
                    setReviews(reviews);
                });
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
    }, [country]);

    return (
        <div>
            {reviews.map((review, index) => (
                <div style={{height: "24vh", borderRadius: "8px", paddingLeft: "10px"}}className={"country-review"} key={index}>
                    <div>
                        <h1 style={{fontSize: "large", padding: "10px"}}>{review.title}</h1>
                        <StarReview rating={review.rating} />
                        <p>{review.desc}</p>
                        <p>Post date: {review.date}</p>
                    </div>
                    <UpvoteButton upvotes={review.likes}></UpvoteButton>
                </div>
            ))}
        </div>
    );
}

export default ReviewDisplay;