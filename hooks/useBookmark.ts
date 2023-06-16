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

const useBookmark = (postId?: string) => {
  const currentUser = useCurrentUser();

  const [hasBookmarked, setHasBookmarked] = useState(false);

  const [bookmarks, setBookmarks] = useState<BookmarkProps[]>([]);

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "users", `${currentUser?.id}`, "bookmarks"),
          orderBy("timestamp", "desc")
        ),
        (snapshot: any) =>
          setBookmarks(
            snapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() }))
          )
      ),
    [currentUser?.id]
  );

  useEffect(() => {
    if (!postId) return;

    setHasBookmarked(
      bookmarks?.findIndex((bookmark) => bookmark?.id === postId) !== -1
    );
  }, [bookmarks, postId]);

  const bookmarkPost = async () => {
    if (!postId) return;

    if (hasBookmarked) {
      await deleteDoc(
        doc(db, "users", `${currentUser?.id}`, "bookmarks", postId)
      );
    } else {
      await setDoc(
        doc(db, "users", `${currentUser?.id}`, "bookmarks", postId),
        {
          timestamp: serverTimestamp(),
        }
      );
    }
  };

  return { hasBookmarked, bookmarkPost, bookmarks };
};

export default useBookmark;
