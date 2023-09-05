import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaCalendarDay, FaMapMarkerAlt } from 'react-icons/fa';
import { db } from './firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';

interface PostData {
  id: number;
  image: string;
  title: string;
  date: string;
  location: string;
  post: string;
}

function PostDetail() {
  const { id } = useParams<{ id?: string }>(); // Make id optional
  const numericId = parseInt(id ?? '', 10); // Provide a default value of '' if id is undefined
  const [post, setPost] = useState<PostData | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const q = query(collection(db, 'blog'), where('id', '==', numericId));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const postDocument = querySnapshot.docs[0];
          const postData = postDocument.data() as PostData;
          setPost(postData);
        } else {
          console.log('Post not found');
        }
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    fetchPost();
  }, [numericId]);

  return (
    <div className="container mx-auto mt-2 p-4 list-container">
      {post ? (

        <>
        <div className="flex flex-col md:flex-row">
           
            <div className="md:w-4/5  p-4">

            <div className="bg-white">
              <img src={post.image} alt={post.title} className="photo" />
              <div className="p-5 pl-14 px-14">
                <p className="mb-2 mt-5 text-base tracking-tight">{post.date}</p>
                <h3 className="my-5 py-5 text-6xl font-bold tracking-tight text-gray-900">{post.title}</h3>
                <h4 className="text-2xl font-bold tracking-tight">Date and time</h4>
                <p className="mb-2 mt-3 text-base tracking-tight hasicon">
                  <FaCalendarDay /> {post.date}
                </p>
                <h4 className="text-2xl font-bold tracking-tight mt-8">Location</h4>
                <p className="mb-2 mt-3 text-base tracking-tight hasicon">
                  <FaMapMarkerAlt /> {post.location}
                </p>
                <h4 className="text-2xl font-bold tracking-tight mt-8">About</h4>
                <div className="mb-2 mt-5 text-base tracking-tight" dangerouslySetInnerHTML={{ __html: post.post }}></div>
              </div>
            </div>
                
            </div>

           
            <div className="md:w-1/5 p-4 scroll-fixed md:h-screen">
              <div className="bg-white pt-8  pb-8 p-4 flex items-center justify-center">

                <div className='container'>
                  <p className='hasicon mb-5 flex justify-center'><FaMapMarkerAlt /> {post.location}</p>

                  <button
                    type="button"
                    className="ticket focus:outline-none text-white bg-orange-600 hover:bg-orange-500  font-medium rounded-lg text-sm px-5 py-2.5  mb-2 "
                  >
                    Get Tickets
                  </button>
                  
                </div>
                

              </div>
            </div>
        </div>
            
        </>
        
      ) : (
        <div className="lds-ring">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      )}
    </div>
  );
}

export default PostDetail;
