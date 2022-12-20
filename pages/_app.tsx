import "../styles/globals.css";
import type { AppProps } from "next/app";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { useState } from "react";

import { NextUIProvider } from "@nextui-org/react";
import { Box } from "../components/Box";
import NavbarComponent from "../components/NavbarComponent";


function MyApp({ Component, pageProps }: AppProps) {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());
  return (
    <SessionContextProvider supabaseClient={supabaseClient}>
      <NextUIProvider>
        <NavbarComponent />
        <Box
          css={{
            px: "$12",
            py: "$10",
            mt: "$11",
            "@xsMax": { px: "$10" },
            maxWidth: "800px",
            margin: "0 auto",
          }}
        >
          <Component {...pageProps} />
        </Box>
      </NextUIProvider>

    </SessionContextProvider>
    
  );
}

export default MyApp;
