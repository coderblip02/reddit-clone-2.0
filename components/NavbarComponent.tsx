import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { Navbar, Button, Text } from "@nextui-org/react";
import Link from "next/link";
import { Image } from "@nextui-org/react";
import { PlusIcon } from "@heroicons/react/24/outline";

const NavbarComponent = () => {
  const supabaseClient = useSupabaseClient();
  const user = useUser();
  const router = useRouter();
  

  function signOutuser() {
    supabaseClient.auth.signOut();
    router.push("/");
  }
  return (
    <Navbar isBordered isCompact>
        
      <Navbar.Brand as={Link} href="/">
       <p className="text-xl">Reddit</p>
      </Navbar.Brand>
      <Navbar.Content hideIn="xs" variant="highlight-rounded">
 
        <Navbar.Link href="/mainFeed">
            Main feed
        </Navbar.Link>
        <Navbar.Link href="/createPost">
            create post
        </Navbar.Link>
      </Navbar.Content>
      <Navbar.Content>
        {!user ? (
          <>
            <Navbar.Link href="/login">
              <Button auto flat>
                Login
              </Button>
            </Navbar.Link>
          </>
        ) : (
          <>
            <Navbar.Item>
              <Text>Hey, {user?.email}</Text>
            </Navbar.Item>
            <Navbar.Item>
              <Button auto flat onPress={() => signOutuser()}>
                Sign Out
              </Button>
            </Navbar.Item>
          </>
        )}
      </Navbar.Content>
    </Navbar>
  );
};

export default NavbarComponent;
