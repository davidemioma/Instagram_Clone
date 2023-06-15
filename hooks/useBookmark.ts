import { useEffect, useState } from "react";
import { BookmarkProps } from "@/types";
import { db } from "@/libs/firebase";
import useCurrentUser from "./useCurrentUser";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";

const useBookmark = (postId: string) => {
  const currentUser = useCurrentUser();

  const [hasBookmarked, setHasBookmarked] = useState(false);

  const [bookmarks, setBookmarks] = useState<BookmarkProps[]>([]);

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "posts", postId, "bookmarks"),
          orderBy("timestamp", "desc")
        ),
        (snapshot: any) =>
          setBookmarks(
            snapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() }))
          )
      ),
    [postId]
  );

  useEffect(
    () =>
      setHasBookmarked(
        bookmarks?.findIndex((bookmark) => bookmark?.id === currentUser?.id) !==
          -1
      ),
    [bookmarks, currentUser?.id]
  );

  const bookmarkPost = async () => {
    if (hasBookmarked) {
      await deleteDoc(
        doc(db, "posts", postId, "bookmarks", `${currentUser?.id}`)
      );
    } else {
      await setDoc(
        doc(db, "posts", postId, "bookmarks", `${currentUser?.id}`),
        {
          postId,
          displayName: currentUser?.displayName,
          timestamp: serverTimestamp(),
        }
      );
    }
  };

  return { hasBookmarked, bookmarkPost };
};

export default useBookmark;
