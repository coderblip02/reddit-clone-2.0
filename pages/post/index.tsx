import type { GetServerSidePropsContext, NextPage } from "next";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import {
  ArrowUpIcon,
  ChatBubbleLeftEllipsisIcon,
  EllipsisHorizontalIcon,
  GiftIcon,
  ShareIcon,
  ArrowDownIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import Avatar from "../../components/Avatar";
import TimeAgo from "react-timeago";

import { useState, useEffect } from "react";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";

const Post: NextPage = () => {
  const supabaseClient = useSupabaseClient();
  const user = useUser();
  const router = useRouter();
  const [post, setPost] = useState<any>({});

  const { id } = router.query;

  useEffect(() => {
    async function getPost() {
      const { data, error } = await supabaseClient
        .from("posts")
        .select("*")
        .filter("id", "eq", id)
        .single();
      if (error) {
        console.log(error);
      } else {
        setPost(data);
      }
    }
    if (typeof id !== "undefined") {
      getPost();
    }
  }, [id]);

  const deletePost = async () => {
    try {
      const { data, error } = await supabaseClient
        .from("posts")
        .delete()
        .eq("id", id);
      if (error) throw error;
      router.push("/mainFeed");
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div className="flex rounded-md cursor-pointer border border-gray-300 bg-white overflow-y-hidden shadow-sm hover:border hover:border-gray-600">
      <div className="flex flex-col items-center justify-start space-y-1 rounded-l-md bg-gray-50 p-4 text-gray-400 ">
        <ArrowUpIcon className="voteButtons hover:text-red-400" />
        <p className="text-black text-xs font-bold">2</p>
        <ArrowDownIcon className="voteButtons hover:text-blue-400" />
      </div>

      <div className="p-3 pb-1">
        <div className="flex items-center space-x-2">
          <Avatar seed={user?.email} />
          <p className="text-xs truncate text-gray-400">
            <span className="font-bold text-black hover:text-blue-400 hover:underline">
              r/{post.subreddit}
            </span>{" "}
            • Posted by u/ {user?.email} <TimeAgo date={post.inserted_at} />
          </p>
        </div>
        <div className="py-4">
          <h2 className="text-xl font-semibold">{post.title}</h2>
          <p className="mt-2 text-sm truncate font-light">{post.content}</p>
        </div>
        <img className="w-full" src="" alt="" />
        <div className="flex space-x-4 text-gray-400">
          <div className="postButtons">
            <ChatBubbleLeftEllipsisIcon className="h-6 w-6" />
            <p className="">Comments</p>
          </div>
          <div className="postButtons">
            <GiftIcon className="h-6 w-6" />
            <p className="hidden sm:inline">Award</p>
          </div>
          <div className="postButtons">
            <ShareIcon className="h-6 w-6" />
            <p className="hidden sm:inline">Share</p>
          </div>
          {user && post.user_id === user.id ? (
            <div onClick={() => deletePost()} className="postButtons">
              <TrashIcon className="h-6 w-6" />
              <p className="hidden sm:inline">Delete</p>
            </div>
          ) : null}

          <div className="postButtons">
            <EllipsisHorizontalIcon className="h-6 w-6" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  // Create authenticated Supabase Client
  const supabase = createServerSupabaseClient(ctx);
  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session)
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };

  return {
    props: {
      initialSession: session,
      user: session.user,
    },
  };
};
