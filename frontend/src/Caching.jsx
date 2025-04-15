import axios from "axios";
import React, { useEffect, useState } from "react";

const Caching = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/data");
      setPosts(response.data);
    } catch (err) {
      setError(true);
      console.error("Error: ", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>Something went wrong.Please try again later.</p>;

  return (
    <div>
      <h2>Cached Posts</h2>
      <ul>
        {posts.slice(0, 10).map((post) => (
          <li key={post.id}>
            <strong>{post.title}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Caching;
