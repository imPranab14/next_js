"use client";
import React, { use, useEffect, useState } from "react";
import axios from "axios";

function UserPage() {
  const [user, setUser] = useState([]);

  console.log("user", user);

  //APi Call Function
  async function fetchData() {
    try {
      const response = await axios.get("https://dummyjson.com/users");

      setUser(response.data.users);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <h1>UserPage</h1>
      {user?.map((ele) => {
        return <li key={ele.id}>{ele.firstName}</li>;
      })}
    </>
  );
}

export default UserPage;
