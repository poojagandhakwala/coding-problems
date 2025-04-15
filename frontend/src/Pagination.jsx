import { Pagination } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

const DataPagination = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(1);
  const limit = 2;

  const fetchUsers = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/users-data?page=${page}&limit=${limit}`
      );
      setUsers(res.data.users);
      setTotal(res.data.total);
    } catch (err) {
      console.error("Error fetching users:", err.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page]);

  return (
    <div>
      <h2>Pagination</h2>
      <ul>
        {users?.map((user, index) => (
          <li key={index}>{user.name}</li>
        ))}
      </ul>

      <Pagination
        style={{ paddingTop: "20px" }}
        count={Math.ceil(total / limit)}
        page={page}
        onChange={(_, nextPage) => setPage(nextPage)}
        color="primary"
        variant="outlined"
        shape="rounded"
      />
    </div>
  );
};

export default DataPagination;
