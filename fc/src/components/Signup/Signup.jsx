import './Signup.css';
import React, {useState} from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {  createUserWithEmailAndPassword  } from 'firebase/auth';
import { auth } from '../../firebase';
 
const Signup = () => {
    const navigate = useNavigate();
 
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
 
    const onSubmit = async (e) => {
      e.preventDefault()
     
      await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log(user);
            navigate("/dashboard")
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
            // ..
        });
 
   
    }
 
  return (
    <main >        
        <section>
            <div className='signup-box'>
                <div>
                    <img src = {'https://firebasestorage.googleapis.com/v0/b/flying-chinchillas.appspot.com/o/Logo-flying-chinchilla.png?alt=media&token=04a409dc-c35b-4123-8f9f-d18112b2044a'} alt="Logo" className={"logo-image"} />
                </div>                 
                <h2> Sign up </h2>                                                                                                                                                         
                <label className='signup-label'
                    htmlFor="email-address"
                >
                    Email address
                </label>
                <input className='signup-input'
                    type="email"
                    label="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}  
                    required                                    
                    //placeholder="Email address"                                
                />

                <label className='signup-label'
                    htmlFor="password"
                >
                    Password
                </label>
                <input className='signup-input'
                    type="password"
                    label="Create password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} 
                    required                                 
                    //placeholder="Password"              
                   />                                           
                    
                <button className='signup-button'
                    type="submit" 
                    onClick={onSubmit}                        
                >  
                    Sign up                                
                </button> 
                
                <label className='signup-label'>
                    Already have an account? {' '}
                    <NavLink to="/login" >
                        Sign in
                    </NavLink> 
                </label>                  
            </div>
        </section>
    </main>
  )
}
 
export default Signup
