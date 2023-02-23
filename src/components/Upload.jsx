import React, { useState } from 'react'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";

const Upload = () => {
    const [file, setFile] = useState()

    const handleSubmit = () => {
        console.log(file)
    
        const storage = getStorage()
        const storageRef = ref(storage, `images/${file.name}`)
        
        const uploadTask = uploadBytesResumable(storageRef, file)

        uploadTask.on('state_changed', 
        (snapshot) => {
            // Observe state change events such as progress, pause, and resume
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
            }
        }, 
        (error) => {
            alert(error)
        }, 
        () => {
            // Handle successful uploads on complete
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log('File available at', downloadURL);
            });
        });

        

    }

    
    

    return (
    <div>
        <input type='file' name='portrait' id='portrait' onChange={(event) => {
            setFile(event.target.files[0])
        }}/>
        <button onClick={handleSubmit}>Upload</button>
    </div>
    )
}

export default Upload