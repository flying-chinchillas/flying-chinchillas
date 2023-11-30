import './Login.css';
import React, {useState} from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {  createUserWithEmailAndPassword, signInWithEmailAndPassword  } from 'firebase/auth';
import { auth } from '../../firebase';
import "@fontsource/mochiy-pop-p-one";
import '@fontsource-variable/montserrat'; 
 
const Login = () => {
    const navigate = useNavigate();
 
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
 
    const onSubmit = async (e) => {
      e.preventDefault()
     
      await signInWithEmailAndPassword(auth, email, password)
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
            <div className='login-box'>                                                                                            
                <div>
                    <img src = {'https://firebasestorage.googleapis.com/v0/b/flying-chinchillas.appspot.com/o/Logo-flying-chinchilla.png?alt=media&token=04a409dc-c35b-4123-8f9f-d18112b2044a'} alt="Logo" className={"logo-image"} />
                </div>
                <h2> Login </h2>                                                                                            
                <label className='login-label'
                    htmlFor="email-address"
                >
                    Email address
                </label>
                <input className='login-input'
                    type="email"
                    label="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}  
                    required                                    
                    //placeholder="Email address"                                
                />

                <label className='login-label'
                    htmlFor="password"
                >
                    Password
                </label>
                <input className='login-input'
                    type="password"
                    label="Create password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}  
                    required                                                    
                    //placeholder="Password"              
                /> 

                <button className='login-button'
                    type="submit" 
                    onClick={onSubmit}                        
                >  
                    Login                               
                </button>
                                                                     
                <label className='login-label'>
                    Don't have an account?
                </label> 
                   
                <label className='login-label'>
                    <NavLink to="/signup" >
                        Sign up
                    </NavLink>
                    {' '}to discover exciting travel destinations!
                </label>                 
            </div>
        </section>
    </main>
  );
}
 
export default Login
