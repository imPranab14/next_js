import React from "react";
import axios from "axios";
//Import Module CSS
import styles from "./style.module.css"

async function ServerHomePage() {
  const response = await axios.get("https://dummyjson.com/users");
  const data = response?.data?.users;
  console.log("server_data", data);

  return (
    <div>
      <h1>Server-side Rendering (SSR) Home</h1>
      {data.map((ele)=>{
        return (
            <li key={ele?.id} className={styles.text}>{ele?.firstName}</li>
        )
      })}
    </div>
  );
}
export default ServerHomePage;

// export async function getServerSideProps() {
//       'use server'

//   console.log("This is a server-side rendered page");
//   const response = await axios.get("https://dummyjson.com/users");
//   const data = response.data.users;
//   return { props: { data } };
// }
