import React from "react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import Avatar from "./Avatar";
import { LinkIcon, PhotoIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/router";

function PostBox() {
  const supabaseClient = useSupabaseClient();
  const user = useUser();
  const router = useRouter();

  return (
    <form className=" sticky top-16 z-50 bg-white border rounded-md p-2 border-gray-300">
      <div className="flex items-center space-x-3">
        <Avatar seed="junior" />
        <input
          disabled={!user}
          className=" rounded-md flex-1 bg-gray-50 pl-5 p-2 outline-none"
          type="text"
          name="title"
          placeholder={
            user
              ? "Click on the plus icon to create post"
              : "Sign in to create post"
          }
        />
        <PlusIcon onClick={() => router.push("/createPost")} className="h-6 text-gray-300 cursor-pointer" />
        <PhotoIcon className={`h-6 text-gray-300 cursor-pointer`} />
      </div>
    </form>
  );
}

export default PostBox;
