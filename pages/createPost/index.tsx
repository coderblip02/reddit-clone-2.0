import type { GetServerSidePropsContext, NextPage } from "next";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { Text, Textarea, Grid, Button } from "@nextui-org/react";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/legacy/image";
import { useState } from "react";


const createPost: NextPage = () => {
  const supabaseClient = useSupabaseClient();
  const user = useUser();
  const router = useRouter();


  const initialState = {
    title: "",
    content: "",
    subreddit: "",
  };

  const [postData, setPostData] = useState(initialState);

  const handleChange = (e: any) => {
    setPostData({ ...postData, [e.target.name]: e.target.value });
  };
 

  const createPostData = async () => {
    try{
        const {data, error} = await supabaseClient
            .from("posts")
            .insert([{
                title: postData.title,
                content: postData.content,
                subreddit: postData.subreddit,
                user_email: user?.email?.toLowerCase(),
                user_id: user?.id
            }
        ])
        .single()
        if (error) throw error;
        setPostData(initialState)
        router.push("/mainFeed")
    

    } catch (error:any){
        alert(error.message)
    
    }
  }

  console.log(postData);

  return (
    <>
      <Image
        width={150}
        objectFit="contain"
        height={150}
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjn0p9r8IJ36sXLLG86-itiMWFZSmPqDhb-9XU1iNAUQAEMDbzvnBZarHgvyd3rUbpWg&usqp=CAU"
        alt=""
      />
      <Grid.Container gap={1}>
        <Text h3>Title</Text>
        <Grid xs={12}>
          <Textarea
            name="title"
            aria-label="title"
            placeholder="post Title"
            fullWidth={true}
            rows={1}
            size="xl"
            onChange={handleChange}
          />
        </Grid>
        <Text h3>Subreddit</Text>
        <Grid xs={12}>
          <Textarea
            name="subreddit"
            aria-label="subreddit"
            placeholder="i.e Worldcup"
            fullWidth={true}
            rows={1}
            size="xl"
            onChange={handleChange}
          />
        </Grid>
        <Text h3>Content text</Text>
        <Grid xs={12}>
          <Textarea
            name="content"
            aria-label="content"
            placeholder="Post content"
            fullWidth={true}
            rows={6}
            size="xl"
            onChange={handleChange}
          />
        </Grid>
        <Grid xs={12}>
          <Text>Posting as {user?.email}</Text>
        </Grid>
        <Button onPress={createPostData}>Create Post</Button>
      </Grid.Container>
    </>
  );
};

export default createPost;

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
