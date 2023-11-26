import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import React, { useRef, useEffect, useState } from 'react';
import { getAuth } from "firebase/auth";



function UserProfile() {
    const fileInput = useRef();
    const storage = getStorage();
    const auth = getAuth();
    const userId = auth.currentUser.uid;

    const [imgUrl, setImgUrl] = useState(null);
    const storageRef = ref(storage, 'pfimages/' + userId);

    
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
        <div>
            <input type="file" ref={fileInput} />
            <button onClick={handleUpload}>Upload</button>
            <img src={imgUrl} alt='profile' />

        </div>
    );

}

export default UserProfile;