import axios from "axios";
import React, { useState } from "react";

const RateLimit = () => {
  const [data, setData] = useState();
  const [error, setError] = useState("");
  const [count, setCount] = useState(0);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/data-rate-limit");
      setCount((prev) => prev + 1);
      setData(response.data);
    } catch (err) {
      if (err.response?.status === 429) {
        setError(err.response.data.error);
      } else {
        setError("Something went wrong");
      }
    }
  };

  return (
    <div>
      <h2> API Rate Limiting</h2>
      <button onClick={() => fetchData()}>Fetch Data</button>
      <h4>Data fetched for {count} times</h4>
      <p>Fetched data - {data?.message}</p>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default RateLimit;
