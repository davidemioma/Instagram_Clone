import { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { Figtree } from "next/font/google";
import { ImUserCheck } from "react-icons/im";
import useAccountById from "@/hooks/useAccountById";
import useCurrentUser from "@/hooks/useCurrentUser";
import useFollowing from "@/hooks/useFollowing";
import LargeScreen from "@/components/userInfo/LargeScreen";
import usePostsByUserId from "@/hooks/usePostsByUserId";
import SmallScreen from "@/components/userInfo/SmallScreen";
import { BsGrid3X3, BsBookmark } from "react-icons/bs";
import useBookmark from "@/hooks/useBookmark";
import UserPosts from "@/components/userInfo/UserPosts";
import SavedPosts from "@/components/userInfo/SavedPosts";

const font = Figtree({ subsets: ["latin"] });

enum VIEWS {
  POSTS = 0,
  SAVED = 1,
}

export default function Profile() {
  const router = useRouter();

  const { id } = router?.query;

  const currentUser = useCurrentUser();

  const [view, setView] = useState(VIEWS.POSTS);

  const account = useAccountById(id as string);

  const posts = usePostsByUserId(id as string);

  const { bookmarks } = useBookmark();

  const { isFollowing, followUser, followers, followings } = useFollowing(
    account?.id!
  );

  let content = <UserPosts posts={posts} />;

  if (view === VIEWS.SAVED) {
    content = <SavedPosts bookmarks={bookmarks} />;
  }

  return (
    <div className={`${font.className}`}>
      <Head>
        <title>@{account?.displayName || ""} - Profile</title>

        <link rel="icon" href="/logo.webp" />
      </Head>

      <main>
        <div className="flex items-center space-x-5 md:space-x-10 py-6 sm:py-8 px-5 mx-auto max-w-3xl">
          <div className="relative w-20 h-20 md:w-32 md:h-32 rounded-full border-2 border-gray-400 overflow-hidden">
            <Image
              className="object-cover"
              src={
                account?.profileUrl ||
                account?.photoUrl ||
                "/assets/no-profile.jpeg"
              }
              fill
              alt=""
            />
          </div>

          <div className="flex-1">
            <div className="flex items-center space-x-5 mb-4">
              <h1 className="text-2xl font-light">{account?.displayName}</h1>

              {account?.id !== currentUser?.id && (
                <button
                  className={`${
                    isFollowing ? "unfollowBtn" : "followBtn"
                  } disabled:cursor-not-allowed`}
                  onClick={followUser}
                >
                  {isFollowing ? <ImUserCheck size={20} /> : <p>Follow</p>}
                </button>
              )}
            </div>

            <div className="hidden sm:inline-flex items-center space-x-5 md:space-x-8">
              <LargeScreen data={posts} text="Post" isFollower />

              <div className="cursor-pointer">
                <LargeScreen data={followers} text="Follower" isFollower />
              </div>

              <div className="cursor-pointer">
                <LargeScreen data={followings} text="Following" />
              </div>
            </div>
          </div>
        </div>

        <SmallScreen
          postsLength={posts?.length || 0}
          followersLength={followers?.length || 0}
          followingsLength={followings?.length || 0}
        />

        <div className="w-full max-w-[calc(1024px-64px)] mx-auto border-t border-gray-300">
          <div className="flex items-center justify-center space-x-20 px-4 max-w-sm mx-auto">
            <button
              className={`${
                view === VIEWS.POSTS && "border-t-2 border-black"
              } profileBtn`}
              onClick={() => setView(VIEWS.POSTS)}
            >
              <BsGrid3X3 className="text-xs" />

              <p>Posts</p>
            </button>

            {account?.id === currentUser?.id && (
              <button
                className={`${
                  view === VIEWS.SAVED && "border-t-2 border-black"
                } profileBtn`}
                onClick={() => setView(VIEWS.SAVED)}
              >
                <BsBookmark className="text-xs" />

                <p>Saved</p>
              </button>
            )}
          </div>
        </div>

        {content}
      </main>
    </div>
  );
}
