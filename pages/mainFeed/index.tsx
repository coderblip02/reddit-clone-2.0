import type { NextPage } from 'next'
import {useUser, useSupabaseClient} from "@supabase/auth-helpers-react"
import  {useRouter} from "next/router";
import {useState, useEffect} from "react"

import PostBox from '../../components/PostBox';
import PostCard from '../../components/PostCard';

const MainFeed: NextPage = () => {

    const supabaseClient = useSupabaseClient();
    const user = useUser();
    const router = useRouter();
    const [posts, setPosts] = useState<string[]>([]);

    useEffect(() => {
        getPosts();
    }, [])

    const getPosts = async () => {
        try{
            const {data, error} = await supabaseClient
                .from("posts")
                .select("*")
                .limit(10)
            console.log(data);
            if(data != null) {
                setPosts(data)
            }
        } catch (error: any) {
            alert(error.message);
        }
    }

    return(
        <div className="mt-5 space-y-4">
        <PostBox />
        {posts.map((post) => (
           <PostCard post={post} />
        ))}
            
        </div>
    )
  



}


export default MainFeed