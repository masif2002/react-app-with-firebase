import React, { useEffect, useState } from 'react'
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, GithubAuthProvider, onAuthStateChanged, signOut } from "firebase/auth";
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const Login = () => {

  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  // useEffect(() => {
  //   getRealTimeData()
  // }, [])

  const auth = getAuth();

  // useEffect(() => {
  //   onAuthStateChanged(auth, (user) => {
  //     if (user) 
  //       alert("Logged In")
  //     else 
  //       alert("Not Logged In")
  //   })
    
  // }, [])

  const handleSubmit = () => {

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

  const createData = async () => {
    await addDoc(collection(db, 'employer'), {
      'company': 'gowthamNco',
      'employee_count': 500
    }).then((res) => {
      console.log(res)
    }).catch((err) => {
      alert(err)
    })
  }
  
  const readData = async () => {
    await getDocs(collection(db, 'employer'))
    .then((res) => {
      // Looping through each entry
      res.forEach((doc) => {
        console.log({id: doc.id, ...doc.data()});
      });
    })
    .catch((err) => {
      alert(err.message)
    })
  }

  const updateData = async () => {
    await updateDoc(doc(db, 'employer', '6BG5HIL2xaaENIpgzBbt'), {
      'employee_count': 400
    }).then((res) => {
      console.log(res) //undefined
    }).catch ((err) => {
      alert(err)
    })
  }
  
  const deleteData = async () => {
    await deleteDoc(doc(db, 'employer', '22JZFnohzXZEDNMIq26l'))
    .then((res) => {
      console.log(res) //undefined
    }).catch ((err) => {
      alert(err)
    })
  }

  const getRealTimeData = () => {
    onSnapshot(collection(db, 'employer'), (res) => {
      res.forEach((doc) => {
        console.log(doc.data());
      });
    })
  }

  const queryData = async () => {
    const collectionRef = collection(db, 'employer')
    const jQuery = query(collectionRef, where('employee_count', '>', 50))

    await getDocs(jQuery)
    .then((res) => {
      // Looping through each entry
      res.forEach((doc) => {
        console.log({id: doc.id, ...doc.data()});
      });
    })
    .catch((err) => {
      alert(err)
    })
    .finally(() => {
      console.log('Query completed ...')
    })
  }

  const logOut = () => {
    signOut(auth)
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

      <button
        onClick={logOut}
      >Logout</button>

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