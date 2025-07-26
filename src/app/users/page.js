"use client";
import React, { use, useEffect, useState } from "react";
import axios from "axios";
//For Data Fetching in next js
import useSWR from "swr";

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

  //Using SWR
  //Axios Fetcher Function
  const fetcher = (url) => axios.get(url).then((res) => res.data);
  const { data, error, isLoading, isValidating, mutate } = useSWR(
    "https://dummyjson.com/users",
    fetcher
  );

  console.log("swr_request_data", data);

  if(isLoading){
    return <p>Loading...</p>
  }

  return (
    <>
      <h1 className="text-xl">UserPage (Client Side Data Fetching)</h1>
      {user?.map((ele) => {
        return <li key={ele.id}>{ele.firstName}</li>;
      })}
    </>
  );
}

export default UserPage;
