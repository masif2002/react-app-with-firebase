import React, { useState } from 'react'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const SignUp = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = () => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user)
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage)
      });
  }


  return (
    <div>
      <h1>  SignUp </h1>

      <input 
        type="email" 
        placeholder='Enter email' 
        name='email'
        id='email'
        onChange={(event) => setEmail(event.target.value)}/> 
      <input 
        type="password" 
        placeholder='Enter password' 
        name='password' 
        id='password' 
        onChange={(event) => {
          setPassword(event.target.value) }}
      /> 
      {console.log(email)}
      <button onClick={handleSubmit}>SignUp</button>
    </div>
  )
}

export default SignUp