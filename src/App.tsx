import { useState, useEffect } from 'react';
import { db } from './firebase';
import { collection, getDocs, orderBy, query, doc} from 'firebase/firestore';
import Search from './components/Search';
import PostList from './components/PostList';
import Footer from './components/Footer';
import Header from './components/Header';
import Add from './Add';
import BlogView from './Details';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

interface Post {
  title: string;
  // Add any other properties you have in your Post type
}

function App() {
  const [message, setMessage] = useState<string>('Register New Users');
  const [postList, setPostList] = useState<Post[]>([]);

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const q = query(collection(db, 'blog'), orderBy('timestamp', 'desc'));
        const querySnapshot = await getDocs(q);
        const posts = querySnapshot.docs.map((doc) => ({
          idkey: doc.id,          // Add the 'id' field with the document ID
          ...doc.data() as Post
        }));
        setPostList(posts);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setMessage('Error: Unable to fetch posts. Please try again later.');
      }
    };
  
    fetchPosts();
  }, []);
  

  useEffect(() => {
    if (searchQuery === '') {
      setFilteredPosts(postList);
    } else {
      const filtered = postList.filter((post) =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredPosts(filtered);
    }
  }, [searchQuery, postList]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setFilteredPosts(
      postList.filter((post) =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  };

  return (
    <div className="App">
      <div>
        <Router>
          <Routes>
            <Route
              
              path="/"
              element={
                <>
                  <Search
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    handleSubmit={handleSubmit}
                  />
                  <PostList filteredPosts={filteredPosts} />
                </>
              }
            />
            <Route
              
              path="/event/:id"
              element={
                <>
                  <Header />
                  <BlogView />
                </>
              }
            />
            <Route
              
              path="/add/"
              element={
                <>
                  <Header />
                  <Add />
                </>
              }
            />
          </Routes>
        </Router>
        <Footer />
      </div>
    </div>
  );
}

export default App;
