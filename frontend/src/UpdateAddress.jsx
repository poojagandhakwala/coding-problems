import { Input } from "@mui/material";
import React, { useState } from "react";

const UpdateAddress = () => {
  const [user, setUser] = useState({
    name: "John Doe",
    address: {
      street: "123 Main St",
      city: "New York",
    },
  });
  const [newCity, setNewCity] = useState();
  //   const [newCity, setNewCity] = useState();

  const handleAddressChange = () => {
    if (!newCity) {
      alert("Please enter city!");
      return;
    }
    setUser({
      ...user,
      address: { ...user.address, city: newCity },
    });
  };

  return (
    <div>
      <h2>Update Address</h2>

      <p>Name: {user.name}</p>
      <p>
        Address: {user.address.street}, {user.address.city}
      </p>
      <Input
        type="text"
        placeholder="City"
        style={{
          padding: "5px",
          fontSize: "16px",
          border: "1px solid #ccc",
          borderRadius: "4px",
        }}
        onChange={(e) => setNewCity(e.target.value)}
      />
      <br />
      <button
        style={{
          marginTop: "12px",
        }}
        onClick={() => handleAddressChange(newCity)}
      >
        Change City
      </button>
    </div>
  );
};

export default UpdateAddress;
