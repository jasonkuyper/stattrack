import Image from "next/image";
import { Inter } from "next/font/google";
import { DiffieHellmanGroup } from "crypto";
import Link from "next/link";
import { useRouter } from "next/router";
import { SignInButton } from "@clerk/nextjs";

// const inter = Inter({ subsets: ["latin"] });

export default function Home(): JSX.Element {
  let router = useRouter();

  const navigate = (route: string) => {
    router.push(route);
  };

  return (
    <main>
      <h1>StatTrack</h1>

      <h3>Log In</h3>
      <button type="button" onClick={() => navigate("/login")}>
        Log In
      </button>

      <h3>Sign Up</h3>
      <button type="button" onClick={() => navigate("/signup")}>
        Sign Up
      </button>
    </main>
  );
}
