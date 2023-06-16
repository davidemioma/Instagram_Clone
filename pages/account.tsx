import Head from "next/head";
import { Figtree } from "next/font/google";

const font = Figtree({ subsets: ["latin"] });

export default function Account() {
  return (
    <div className={`${font.className}`}>
      <Head>
        <title>Account Settings</title>

        <link rel="icon" href="/logo.webp" />
      </Head>

      <main></main>
    </div>
  );
}
