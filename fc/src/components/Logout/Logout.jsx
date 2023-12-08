import './Logout.css';
import React from 'react';

import { getAuth, signOut } from "firebase/auth";
import { NavLink, useNavigate } from 'react-router-dom';

// import { auth } from '../../firebase';
export default function Logout(e) {
    // e.preventDefault();
    const navigate = useNavigate();

    const onLogout = () => {
        const auth = getAuth();
        signOut(auth).then(() => {
            navigate("/")
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
        });
    }


    return (
        <main>
            <section>
            <div>
                                                                           
                <button className={"logout-button"}
                onClick={onLogout}
                type='submit'
                >
                </button>                                                                                                          
            </div>
        </section>
        </main>
    );
}
