import axios from "axios";
import React, { useEffect, useState } from "react";
import { FixedSizeList as List } from "react-window";

const FetchData = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/data");
      setPosts(response.data);
    } catch (err) {
      setError(true);
      console.error("Error:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error)
    return (
      <p style={{ color: "red" }}>
        Something went wrong. Please try again later.
      </p>
    );

  const Row = ({ index, style }) => (
    <div style={style} key={posts[index].id}>
      <strong>{posts[index].title}</strong>
    </div>
  );

  return (
    <List
      height={800}           // viewport height
      itemCount={posts.length}
      itemSize={45}         
      // width={"100%"}
    >
      {Row}
    </List>
  );
};

export default FetchData;
