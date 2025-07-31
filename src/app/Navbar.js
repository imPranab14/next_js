"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import React from "react";

function Navbar() {
  const session = useSession();
  return (
    <>
      <div className="flex justify-between items-center bg-blue-100 px-6 py-3">
        <p>Nav</p>

        {session.data === null && (
          <button
            onClick={signIn}
            className="px-4 py-1 rounded-2xl bg-blue-400"
          >
            Sign In
          </button>
        )}
        {session && session.data && (
          <div className="flex items-center gap-2">
            <p>{session.data?.user.name ?? "NA"}</p>
            <button
              className="bg-red-400 px-3 py-2 rounded-xl text-sm"
              onClick={signOut}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default Navbar;
