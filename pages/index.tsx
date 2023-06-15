import Head from "next/head";
import { Figtree } from "next/font/google";
import Feed from "@/components/Feed";
import Widgets from "@/components/Widgets";

const font = Figtree({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className={`${font.className}`}>
      <Head>
        <title>Instagram-Clone</title>

        <link rel="icon" href="/logo.webp" />
      </Head>

      <main className="flex px-6 md:px-8 max-w-4xl mx-auto">
        <Feed />

        <Widgets />
      </main>
    </div>
  );
}
