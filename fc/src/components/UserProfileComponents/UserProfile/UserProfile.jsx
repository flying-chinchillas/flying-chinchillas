
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getDatabase, ref as dbref, onValue, get } from 'firebase/database';
import React, { useRef, useState, useEffect } from 'react';
import { getAuth, updatePassword, reload, verifyBeforeUpdateEmail, fetchSignInMethodsForEmail} from "firebase/auth";
import HeaderSearch from "../../HeaderComponents/HeaderSearch/HeaderSearch";
import './UserProfile.css';
import '@fontsource/happy-monkey';

function UserProfile() {
    const fileInput = useRef();
    const storage = getStorage();
    const auth = getAuth().currentUser;
    const userId = auth.uid;
    const userEmail = auth.email;

    const [imgUrl, setImgUrl] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [update, setUpdate] = useState(null);
    const storageRef = ref(storage, 'pfimages/' + userId);
    const [favorites, setFavorites] = useState([]);
    const [visited, setVisited] = useState([]);

    const db = getDatabase();
    useEffect(() => {
        onValue(dbref(db, 'user/' + userId + '/reviews'), (snapshot) => {
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
        onValue(dbref(db, 'user/' + userId + '/favorite'), (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setFavorites(Object.values(data)); 
            }
        }, {
            onlyOnce: true
        });
        onValue(dbref(db, 'user/' + userId + '/visited'), (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setVisited(Object.values(data)); 
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
                // console.log(error);
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
            // console.log("error");
        }, 
        () => {
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
    function closeForm() {
        document.getElementById("popup").style.display = "none";
        // document.getElementById("heading").style.opacity = "100%"; replace heading
      }
      function openForm(changeInfo) {
        document.getElementById("popup").style.display = "flex";
        setUpdate(changeInfo);
        // document.getElementById("heading").style.opacity = "20%"; replace heading 
    }

    function submitChange(event) {
        event.preventDefault();
        const change = document.getElementById("change").value;
        if (update === "password"){

            updatePassword(auth, change).then(() => {
                console.log('success');
            }).catch((error) => {
                console.log(error);             
            });    
        }
        else if (update === "email"){
            verifyBeforeUpdateEmail(auth, change).then(() => {
                console.log('success');
            }).catch((error) => {
                console.log(error);             
            });
        }
        closeForm();
        document.querySelector('#form').reset();

    }

    getPFPic();

    return (
        <div className="head-userprofile">
            <HeaderSearch/> 
        <div className="profile">
            {/* Left side: user info */}
            <div className="accountInfo">
                <button class = "editButton" onClick={(event) =>openForm(event.target.id)}>Edit profile</button>
                <img className = "profile-image" src={imgUrl} alt='profile' />
                <p className="nameText">Chinchillas</p> {/* need users' name */} 
                <p className="userInfor">@{userEmail}</p>
                <div className="editPfPic" id="editPfPic">
                    <input type="file" ref={fileInput} />
                    <button onClick={handleUpload}>Upload</button>
                    {/* <button id="File" onClick={(event) =>openForm(event.target.id)}>Open</button> */}
                </div>
                <button id="email" onClick={(event) =>openForm(event.target.id)}>Edit email</button> 
                <button id="password" onClick={(event) =>openForm(event.target.id)}>Change Password</button>
            </div>

            {/* Middle Section: reviews created by user */}
            <div className="reviewContainer"> Reviews Made
                {reviews.length > 0 ? (
                    <div className="reviewContainerContent">
                        {reviews.map((review, index) => (
                            <div key={index}>
                                {/* Replace this with the structure of your review data */}
                                <div className="singleReviewBox"> 
                                    <p className="reviewTitle">{review.title}</p>
                                    <div className="reviewLines">
                                        <p className="reviewCountryandDate">{review.country}</p> 
                                        <p className="reviewCountryandDate">{review.date}</p>
                                    </div>
                                    <p className="reviewTitle">{'"'}{review.desc}{'"'}</p>
                                    <div className="reviewLines">
                                        <p className="reviewCountryandDate">Likes: {review.likes}</p>
                                        <p className="reviewCountryandDate">Dislikes: {review.dislikes}</p>
                                        <p className="reviewCountryandDate">Rating: {review.rating}</p>
                                    </div>
                                    
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div>No reviews yet</div>
                )}
            </div>

            {/* Right side: visited/fav countries */}
            <div className="rightSide">
                <div className="visitedContainer">Visited Countries
                <div className="visitedContainerContent">
                    {
                        visited.map((visCountry) => (
                            <div className="countries">{visCountry}</div>
                        ))
                    }  
                </div>
                </div>

                <div className="favContainer">Favorited Countries
                <div className="favContainerContent">
                    {
                        favorites.map((favorite) => (
                            <div className="countries">{favorite}</div>
                        ))
                    } 
                </div>
                </div>
                
            </div>

            {/* popup form */}
            <div className="popup" id="popup">
                <form className="form" id="form">
                    <h1>Change { update }</h1>
                    <div className="inputContainer">
                        <label htmlFor="change"><b>{ update }</b></label>
                        <input type={update} id="change" name="change" required></input>
                        </div>
                    <button type="button" className="submit" onClick={submitChange}>Submit</button>
                    <button type="button" className="cancel" onClick={closeForm}>X</button>
                </form>
            </div>
            
            {/* change attempt status popup */}
            <div className="popup" id="popupStatus">
                <form className="form" id="form">
                    <h1>Change { update }</h1>
                    <div className="inputContainer">
                        <label htmlFor="change"><b>{ update }</b></label>
                        <input type={update} id="change" name="change" required></input>
                        </div>
                    <button type="button" className="submit" onClick={submitChange}>Submit</button>
                    <button type="button" className="cancel" onClick={closeForm}>X</button>
                </form>
            </div>

        </div>
        </div> 
    );

}

export default UserProfile;
