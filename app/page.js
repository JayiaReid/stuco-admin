"use client"
// import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/dist/types/server";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {

  const [isAuthenticated, authenticate]=useState(false)

  useEffect(()=>{

    // if(isAuthenticated){
    //   redirect('/dashboard')
    // }

    redirect('/api/auth/login?post_login_redirect_url=/dashboard')
  }, [])

  // login page : onclick of sign in with google redirect to that 

  return (
    <div className="text-white bg-black h-screen flex justify-center items-center">
      redirecting to login...
    </div>
  );
}
