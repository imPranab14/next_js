"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";

function dynamicPage() {
  //const router = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams.get('search')
 
  // This will not be logged on the server when using static rendering
  console.log(search)

  return <div>dynamicPage</div>;
}

export default dynamicPage;
