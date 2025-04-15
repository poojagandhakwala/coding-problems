import React, { useEffect, useState } from "react";
import axios from "axios";

const UserForm = () => {
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState();

  const handleChange = (e) => {
    setUser("");
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.name) {
      alert("Please fill all the fields!");
    }
    const response = await axios.post("http://localhost:3000/users", formData);
    setUser(response.data.user);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await axios.get("http://localhost:3000/users");
      setUsers(res.data);
    };
    fetchUsers();
  }, []);

  return (
    <div>
      <h2>Create User</h2>
      <form onSubmit={handleSubmit} style={{padding:"5px"}}>
        <input name="name" onChange={handleChange} placeholder="Name" />
        <br /> 
        <input name="email" onChange={handleChange} placeholder="Email" />
        <br />
        <br />
        
        <button type="submit">Submit</button>
      </form>
      <h3>All Users:</h3>
      <ul>
        {users.map((user, idx) => (
          <li key={idx}>
            Name:{user.name}, Email: {user.email}
          </li>
        ))}
      </ul>
      {user && (
        <h4>
          User Added!
          <br />
          Name:{user.name}, Email: {user.email}
        </h4>
      )}
    </div>
  );
};

export default UserForm;
