import { useEffect, useState } from "react";
import { LikeProps } from "@/types";
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

const useLike = (postId: string) => {
  const currentUser = useCurrentUser();

  const [hasLiked, setHasLiked] = useState(false);

  const [likes, setLikes] = useState<LikeProps[]>([]);

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "posts", postId, "likes"),
          orderBy("timestamp", "desc")
        ),
        (snapshot: any) =>
          setLikes(
            snapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() }))
          )
      ),
    [postId]
  );

  useEffect(
    () =>
      setHasLiked(
        likes?.findIndex((like) => like?.id === currentUser?.id) !== -1
      ),
    [likes, currentUser?.id]
  );

  const likePost = async () => {
    if (hasLiked) {
      await deleteDoc(doc(db, "posts", postId, "likes", `${currentUser?.id}`));
    } else {
      await setDoc(doc(db, "posts", postId, "likes", `${currentUser?.id}`), {
        displayName: currentUser?.displayName,
        timestamp: serverTimestamp(),
      });
    }
  };

  return { likes, hasLiked, likePost };
};

export default useLike;
