"use client";
import Image from "next/image";
import { useSession, signIn,signOut } from "next-auth/react";

export default function Home() {
  const session = useSession();
  console.log(session);
  if (session.data === null) {
    return (
      <button
        onClick={signIn}
        className="px-4 py-1 rounded-2xl bg-blue-400 m-3"
      >
        Sign IN
      </button>
    );
  }
  //Git Hub Login User Info
  console.log(session);
  return (
    <>
      <div className="flex justify-between items-center bg-blue-100 px-6 py-3">
        <p>Home Page</p>
        <div className="flex items-center gap-2">
        <p>{session.data?.user.name??"NA"}</p>
        <button className="bg-red-400 px-3 py-2 rounded-xl text-sm" onClick={signOut}>Logout</button>
        </div>
      </div>
    </>
  );
}
