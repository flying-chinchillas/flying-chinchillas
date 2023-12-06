import { useEffect, useState } from 'react';
import { getDatabase, ref, get, child } from "firebase/database";
import StarReview from '../StarReview/StarReview';

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
                <div key={index}>
                    <h2>{review.title}</h2>
                    <p>{review.desc}</p>
                    <StarReview rating={review.rating} />
                    <p>Star rating: {review.rating}</p>
                    <p>Post date: {review.date}</p>
                    <p>Likes: {review.likes}</p>
                    <p>Dislikes: {review.likes}</p>
                </div>
            ))}
        </div>
    );
}

export default ReviewDisplay;