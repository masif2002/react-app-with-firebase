import React, { useState } from 'react'
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";

const Login = () => {

  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  const handleSubmit = () => {

    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user)
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage)
      });
  }

  const googleLogin = () => {
    const provider = new GoogleAuthProvider();

    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result)
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const user = result.user;

      }).catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          alert(errorMessage)
          const email = error.customData.email;
          const credential = GoogleAuthProvider.credentialFromError(error);
      });
  }

  const githubLogin = () => {

    const provider = new GithubAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
          // This gives you a GitHub Access Token. You can use it to access the GitHub API.
          const credential = GithubAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;

          // The signed-in user info.
          const user = result.user;
          console.log(user)
      }).catch((error) => {

          const errorCode = error.code;
          const errorMessage = error.message;
          alert(errorMessage)

          // The email of the user's account used.
          const email = error.customData.email;
          // The AuthCredential type that was used.
          const credential = GithubAuthProvider.credentialFromError(error);
          // ...
      });
  }

  return (
    <div>
      <h1>Login</h1>

      <input 
        type='email'  
        name='email'
        id='email'
        placeholder='Enter email'
        onChange={(event) => {setEmail(event.target.value)}}
      />

      <input 
        type='password'  
        name='password'
        id='password'
        placeholder='Enter password'
        onChange={(event) => {setPassword(event.target.value)}}
      />

      <button
        onClick={handleSubmit}
      >Login</button>

      <h2>OR</h2>

      <button onClick={googleLogin}>
        Login with Google
      </button>
      

      <button onClick={githubLogin}>
        Login with GitHub
      </button>
    </div>
  )
}

export default Login