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
            navigate("/Login")
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
                <div>                  
                    <h1> Flying Chinchillas </h1>                                                                            
                                               
                        <button
                        onClick={onLogout}
                        type='submit'
                        >
                            Logout
                        </button>                                                                                                          
                </div>
            </div>
        </section>
        </main>
    );
}
