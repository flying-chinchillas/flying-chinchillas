import { useEffect, useState } from 'react';
import { getDatabase, ref, get, child } from "firebase/database";
import StarReview from '../StarReview/StarReview';
import UpvoteButton from '../../ReviewComponents/UpvoteButton/UpvoteButton';

function ReviewDisplay({ displayedReviews}) {

    return (
        <div>
            {displayedReviews.map((review, index) => (
                <div style={{
                    borderRadius: "8px",
                    paddingLeft: "10px",
                    backgroundColor: "rgba(217, 219, 238)",
                    margin: "4vh"
                }}className={"country-review"} key={index}>
                        <h1 style={{fontSize: "large", padding: "10px"}}>{review.title}</h1>
                        <StarReview rating={review.rating} />
                        <p>{review.desc}</p>
                        <p style={{fontSize: "small"}}>Post date: {review.date}</p>
                        <div className={"tags"} style={{
                            fontSize: "x-small",
                            display:"grid",
                            gridTemplateColumns: "1fr 1fr 1fr 1fr",
                            rowGap: "0"
                        }}>
                        {review.tags.map((tag) => (
                            <div style={{
                                backgroundColor: "plum",
                                marginRight: "5vh",
                                marginBottom: "1vh",
                                borderRadius: "30px",
                                textAlign: "center",
                        }}>{tag}</div>
                        ))}
                        </div>
                        <UpvoteButton upvotes={review.likes}/>
                </div>
            ))}
        </div>
    );
}

export default ReviewDisplay;