import React from "react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import Image from "next/legacy/image";

type Props = {
  seed?: string;
  large?: boolean;
};

function Avatar({ seed, large }: Props) {
  const supabaseClient = useSupabaseClient();
  const user = useUser();

  return (
    <div
      className={` relative overflow-hidden h-10 w-10 rounded-full border-gray-300 bg-white ${
        large && "h-20 w-20"
      }`}
    >
      <Image
        layout="fill"
        src={`https://avatars.dicebear.com/api/open-peeps/${
          seed || user?.email || "placeholder"
        }.svg`}
      />
    </div>
  );
}

export default Avatar;
