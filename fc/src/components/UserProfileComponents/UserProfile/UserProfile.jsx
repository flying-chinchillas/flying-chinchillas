import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import React, { useRef } from 'react';


function UserProfile() {
    const temp_reviews = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const fileInput = useRef();

    const getFile = (file) => {
        const storage = getStorage();

        // Create the file metadata
        /** @type {any} */
        const metadata = {
        contentType: 'image/jpeg'
        };

        // Upload file and metadata to the object 'pfimages/filename.jpg'
        const storageRef = ref(storage, 'pfimages/' + file.name);
        const uploadTask = uploadBytesResumable(storageRef, file, metadata);

        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on('state_changed',
        (snapshot) => {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
            case 'paused':
                console.log('Upload is paused');
                break;
            case 'running':
                console.log('Upload is running');
                break;
            default:
                console.log("error");
            }
        }, 
        (error) => {
            console.log("error");
        }, 
        () => {
            // Upload completed successfully, now we can get the download URL
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log('File available at', downloadURL);
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

    return (
        <div className={"up-dash"}>
            <input type="file" ref={fileInput} />
            <button onClick={handleUpload}>Upload</button>
            <div className={"v-groups-display"}/>
            <div className={"reviews"}>
                <div className={"country-name"}>Name of Country</div>
                <div className={"review-header"}>Reviews:</div>
                <div className={"review-display"}>
                    {temp_reviews.map((review) => (
                        <div className={"country-review"} key={review}>
                            {review}
                        </div>
                        )
                    )}
                </div>
            </div>
            
            <div className={"side-bar"}> 
                <div className={"visited-countries"}>
                    <div className={"v-c-header"}>
                        <img src={"https://firebasestorage.googleapis.com/v0/b/flying-chinchillas.appspot.com/o/happy-chinchilla.png?alt=media&token=4cfaa0bf-1eb9-49ef-8612-41618227638c"} alt="Rating" className={"rating-image"}/>
                    </div>
                </div>
                <div className={"overall-rating"}>
                    <div className={"o-r-header"}>
                        <img src={"https://firebasestorage.googleapis.com/v0/b/flying-chinchillas.appspot.com/o/happy-chinchilla.png?alt=media&token=4cfaa0bf-1eb9-49ef-8612-41618227638c"} alt="Rating" className={"rating-image"}/>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default UserProfile;