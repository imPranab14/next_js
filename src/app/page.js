'use client';

import Image from "next/image";
import { useSession,signIn } from 'next-auth/react';

export default function Home() {
  const session =useSession()


  console.log(session);
  if(session.data === null){
    return <button onClick={signIn}>SignIN</button>
  }

  console.log(session);
  return (
    <p>
      Home Page
    </p>
  );
}
