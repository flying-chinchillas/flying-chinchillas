import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import React, { useRef, useEffect, useState } from 'react';
import { getAuth } from "firebase/auth";



function UserProfile() {
    const fileInput = useRef();
    const storage = getStorage();
    const auth = getAuth();
    const userId = auth.currentUser.uid;

    const storageRef = ref(storage, 'pfimages/' + userId);


    const getFile = (file) => {

        // Create the file metadata
        /** @type {any} */
        const metadata = {
        contentType: 'image/jpeg'
        };

        // Upload file and metadata to the object 'pfimages/filename.jpg'
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
        <div>
            <input type="file" ref={fileInput} />
            <button onClick={handleUpload}>Upload</button>
        </div>
    );

}

export default UserProfile;