import './index.css';
import { useState } from 'react';
import { db, auth, provider } from './firebase';
import {
  addDoc,
  collection,
  Timestamp,
  DocumentReference,
} from 'firebase/firestore';
import { UserCredential, signInWithPopup, signOut } from 'firebase/auth';
import { FcGoogle } from "react-icons/fc";


function Add() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem('isAuth'));
  const [input, setInput] = useState<string>('');
  const [post, setPost] = useState<string>('');
  const [image, setImage] = useState<string>('');
  const [message, setMessage] = useState<string>('Register New Users');
  const [location, setLocation] = useState<string>('Toronto, ON');
  const [date, setDate] = useState<string>('Tue, Sep 5, 10:00 PM');

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const postHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPost(e.target.value);
  };

  const dateHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };

  const imageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImage(e.target.value);
  };

  const locationHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLocation(e.target.value);
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input) {
      const currentDate = Timestamp.now();
      const randomId = Math.floor(Math.random() * (10000 - 10 + 1)) + 10;

      try {
        const docRef: DocumentReference = await addDoc(collection(db, 'blog'), {
          id: randomId,
          title: input,
          post: post,
          image: image,
          timestamp: currentDate,
          date: date,
          location: location,
        });
        setInput('');
        setPost('');
        setImage('');
        setMessage('Thank You!');
        console.log('Document written with ID: ', docRef.id);
      } catch (error) {
        console.error('Error adding document:', error);
        setMessage('Error: Unable to add post. Please try again later.');
      }
    } else {
      setMessage('You have to type something!');
    }
  };

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result: UserCredential) => {
        localStorage.setItem('isAuth', 'true');
        setIsAuth('true');
      })
      .catch((error) => {
        console.error('Error signing in with Google: ', error);
      });
  };

  const signUserOut = () => {
    signOut(auth)
      .then(() => {
        localStorage.clear();
        setIsAuth(null);
        window.location.pathname = '/';
      })
      .catch((error) => {
        console.error('Error signing out: ', error);
      });
  };


  return (
    <>
    <div className="App">
      {!isAuth ? (
        
        <div className='flex flex-col items-center justify-center p-5'>
          <button onClick={signInWithGoogle} className="login bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
          <FcGoogle />  Sign in
          </button>
        </div>
      ) : (
        <>

          <div className='flex flex-col items-center justify-center p-5'>
            <button onClick={signUserOut} className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
            Log Out
            </button>
          </div>
  
        </>
      )}

      <div className="flex flex-col items-center justify-center min-h-screen">
        {isAuth ? (
         <>
          <div>
            <h2 className='font-medium text-gray-700 items-center justify-center p-5'>Add a new event</h2>
          </div>
          <div className="w-full max-w-xl p-4 border rounded-lg shadow-md">
            <form
              className="w-full max-w-lx m-auto p-4 border rounded-lg shadow-md bg-gray-100"
              onSubmit={submitHandler}
            >
              <div className="mb-4">
                <label htmlFor="title" className="block font-medium text-gray-700">
                  Title
                </label>
                <input
                  className="w-full px-3 py-2 mt-1 text-gray-700 border rounded-md focus:outline-none focus:border-blue-500"
                  type="text"
                  id="title"
                  placeholder="Title"
                  onChange={inputHandler}
                  value={input}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="post" className="block font-medium text-gray-700">
                  Detail
                </label>
                <textarea
                  className="w-full px-3 py-2 mt-1 text-gray-700 border rounded-md focus:outline-none focus:border-blue-500"
                  name="post"
                  id="post"
                  rows={4}
                  placeholder="Detail"
                  onChange={postHandler}
                  value={post}
                ></textarea>
              </div>
              <div className="mb-4">
                <label htmlFor="image" className="block font-medium text-gray-700">
                  Image URL
                </label>
                <input
                  className="w-full px-3 py-2 mt-1 text-gray-700 border rounded-md focus:outline-none focus:border-blue-500"
                  type="text"
                  id="image"
                  placeholder="Image URL"
                  onChange={imageHandler}
                  value={image}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="location" className="block font-medium text-gray-700">
                  Location
                </label>
                <select
                  className="w-full px-3 py-2 mt-1 text-gray-700 border rounded-md focus:outline-none focus:border-blue-500"
                  id="location"
                  onChange={locationHandler}
                  value={location}
                >
                  <option value="Toronto, ON">Toronto, ON</option>
                  <option value="San Francisco, CA">San Francisco, CA</option>
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="date" className="block font-medium text-gray-700">
                  Date
                </label>
                <input
                  className="w-full px-3 py-2 mt-1 text-gray-700 border rounded-md focus:outline-none focus:border-blue-500"
                  type="text"
                  id="date"
                  placeholder="Date"
                  onChange={dateHandler}
                  value={date}
                />
              </div>
              <button
                className="px-4 py-2 font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
              >
                Register
              </button>
            </form>
            <p className="mt-4 text-red-500">{message}</p>
          </div>
         </>
        ) : null}
      </div>
    </div>
    </>
  );
}

export default Add;
