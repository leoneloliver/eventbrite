import { useState } from 'react';
import { FaRegHeart } from "react-icons/fa";
import Loader from './Loader';


function PostList({ filteredPosts }: any | null) {

  const [postList, setPostList] = useState<any | null >(null);

  window.setTimeout(() => {
    setPostList(filteredPosts)
  },1000)


  return (
    <div className="container mx-auto mt-2 p-4 list-container">


      <h3 className='my-5 py-5 text-2xl font-bold tracking-tight text-gray-900'>All Events</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">


      {postList ?
          postList.map((post: any, index: any) => (

            <div key={index} className="max-w-sm bg-white border border-zinc-200 bg-white card">
              <a href={`/event/${post.id}`}>
                <img  src={post.image} alt={post.title} className="thumb" />
              </a>
              <div className='icon-container'>
                  <div className='icon'>
                    < FaRegHeart />
                  </div>
                </div>
              <div className="p-5 py-3">
                
                
                <a href={`/event/${post.id}`}>
                  <h5 className="mb-2 text-1xl tracking-tight text-gray-900 font-bold">
                  {post.title}
                  </h5>
                </a>
                <p className="mb-2 text-base tracking-tight text-rose-600">
                  {post.date}
                </p>
                <p className="mb-2 text-small tracking-tight">
                  {post.location}
                </p>
                
              </div>
                
            </div>


          )) : 
            <Loader />
          }

          
      </div>

    </div>
  );
}

export default PostList;
