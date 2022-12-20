import type { NextPage } from "next";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";

import { Auth, ThemeSupa } from "@supabase/auth-ui-react";

import Image from "next/image";

const Login: NextPage = () => {
  const supabaseClient = useSupabaseClient();
  const user = useUser();
  const router = useRouter();

  if (user) {
    router.push("/mainFeed");
  }

  return (
    <>
      <div className="bg-white">
        <Image
          alt=""
          width={350}
          height={350}
          src="https://1000logos.net/wp-content/uploads/2017/05/Reddit-logo-500x320.png"
        />

        <Auth
          appearance={{ theme: ThemeSupa }}
          supabaseClient={supabaseClient}
        />
      </div>
    </>
  );
};

export default Login;
