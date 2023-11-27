import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getDatabase, ref as dbref, onValue, get } from 'firebase/database';
import React, { useRef, useState, useEffect } from 'react';
import { getAuth } from "firebase/auth";
import './UserProfile.css';

function UserProfile() {
    const fileInput = useRef();
    const storage = getStorage();
    const auth = getAuth();
    const userId = auth.currentUser.uid;

    const [imgUrl, setImgUrl] = useState(null);
    const [reviews, setReviews] = useState([]);
    const storageRef = ref(storage, 'pfimages/' + userId);

    const db = getDatabase();
    useEffect(() => {
        onValue(dbref(db, 'user/' + userId + '/reviews'), (snapshot) => {
            // setReviews([]);
            const data = snapshot.val();
            if (data) {
                const reviewIds = Object.values(data);
                const reviewPromises = reviewIds.map((id) => {
                    const reviewRef = dbref(db, 'review/' + id);
                    return get(reviewRef).then((snapshot) => snapshot.exists() ? snapshot.val() : null);
                    });
                Promise.all(reviewPromises).then((reviews) => {
                    setReviews(reviews.filter(review => review !== null));
                });   
            }
        }, {
            onlyOnce: true
        });
    }, [db, userId]);

    const getPFPic = () => {
        getDownloadURL(storageRef)
        .then((url) => {
            setImgUrl(url);
        }).catch((error) => {
            const storageRefDefault = ref(storage, 'pfimages/chinchy.jpg');
            getDownloadURL(storageRefDefault)
            .then((url) => {
                setImgUrl(url);
            }).catch((error) => {
                console.log(error);
            });
        });
    }

    const getFile = (file) => {

        /** @type {any} */
        const metadata = {
        contentType: 'image/jpeg'
        };

        const uploadTask = uploadBytesResumable(storageRef, file, metadata);

        uploadTask.on('state_changed',
        (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        }, 
        (error) => {
            console.log("error");
        }, 
        () => {
            // Upload completed successfully, now we can get the download URL
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            getPFPic();
            });
        }
        );
    }
    const handleUpload = () => {
        const file = fileInput.current.files[0];
        if (file) {
            getFile(file);
        } else {
            console.log('No file selected');
        }
    }

    getPFPic();
    return (
        <div className="profile">

            {/* Left side */}
            <div className="accountInfo">
                <img src={imgUrl} alt='profile' />
                <div className="editPfPic">
                    <input type="file" ref={fileInput} />
                    <button onClick={handleUpload}>Upload</button>
                </div>
            </div>

            {/* Middle Section */}
            <div className="reviewContainer">Reviews
                <div className="reviews">
                    {reviews.map((review, index) => (
                        <div key={index}>
                            {/* Replace this with the structure of your review data */}
                            <h2>{review.title}</h2>
                            <h3>{review.country}</h3>
                            <p>{review.date}</p>
                            <p>Likes: {review.likes}</p>
                            <p>Dislikes: {review.dislikes}</p>
                            <p>Rating: {review.rating}</p>
                            <p>{review.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Right side */}
            <div className="rightSide">
                <div className="visitedContainer">Visited Countries
                    <div className="countries">Country 1</div>
                </div>
                <div className="favContainer">Favorite Countries
                    <div className="countries">Country 1</div>
                </div>
            </div>

        </div>
    );

}

export default UserProfile;