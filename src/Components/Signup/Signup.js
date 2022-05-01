import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import GoogleLogo from "../Assets/Image/google.svg";
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import auth from '../Firebase/Firebase.init'
import toast from "react-hot-toast";

const provider = new GoogleAuthProvider();

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState({value:'', error:''});
  const [password, setPassword] = useState({value:'', error:''});
  const [confirmPassword, setConfirmPassword] = useState({value:'', error:''});

  console.log(email);

  const googleAuth = () => {
    signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      navigate('/');
    })
    .catch((error) => {
      // Handle Errors here.
      
      // ...
    });
  }

  const handleEmail = (emailInput) => {
    if(/\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(emailInput)){
      setEmail({value : emailInput, error:""});
    }
    else{
      setEmail({value : '', error:"invalid email"});
    }
  }

  const handlePassword = (passwordInput) => {
    if(passwordInput.length <7) {
      setPassword({value : "", error:"password is too short"});
    }
    else{
      setPassword({value : passwordInput, error:""});
    }
  }

  const handleConfirmPassword = (confirmPasswordInput) => {
    if(confirmPasswordInput === password.value){
      setConfirmPassword({value : confirmPassword, error:""});
    }
    else{
      setConfirmPassword({value :'', error:"Password doesnt match"});
    }
  }
 
  const handleSignup = (event) => {
    event.preventDefault();

    if(email.value === ''){
      setEmail({value:'', error:"Email is required"})
    }

    if(password.value === ''){
      setPassword({value:'', error:"password is required"})
    }

    if(email.value && password.value && confirmPassword.value === password.value){
      createUserWithEmailAndPassword(auth, email.value, password.value)
      .then((userCredential) => {
        const user = userCredential.user;
        navigate('/');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if(errorMessage.inclue('already-in-use')){
          toast.error("Already Exists", {id:"error"});
        }
        else{
          toast.error(errorMessage, {id:"error"});
        }
      });
    }
  }

  return (
    <div className="auth-form-container ">
      <div className="auth-form">
        <h1>Sign Up</h1>
        <form  onSubmit={handleSignup}>
          <div className="input-field">
            <label htmlFor="email">Email</label>
            <div className="input-wrapper">
              <input type="email" name="email" id="email" onBlur={event => handleEmail(event.target.value)}/>
            </div>
            {
              email?.error && <p className='error'>{email.error}</p>
            }
          </div>
          <div className="input-field">
            <label htmlFor="password">Password</label>
            <div className="input-wrapper">
              <input type="password" name="password" id="password" onBlur={event => handlePassword(event.target.value)}/>
            </div>
            {
              password?.error && <p className='error'>{password.error}</p>
            }
          </div>
          <div className="input-field">
            <label htmlFor="confirm-password">Confirm Password</label>
            <div className="input-wrapper">
              <input
                type="password"
                name="confirmPassword"
                id="confirm-password" onBlur={event => handleConfirmPassword(event.target.value)}
              />
            </div>
            {
              confirmPassword?.error && <p className='error'>{confirmPassword.error}</p>
            }
          </div>
          <button type="submit" className="auth-form-submit">
            Sign Up
          </button>
        </form>
        <p className="redirect">
          Already have an account?{" "}
          <span onClick={() => navigate("/login")}>Login</span>
        </p>
        <div className="horizontal-divider">
          <div className="line-left" />
          <p>or</p>
          <div className="line-right" />
        </div>
        <div className="input-wrapper">
          <button className="google-auth" onClick={googleAuth}>
            <img src={GoogleLogo} alt="" />
            <p> Continue with Google </p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
