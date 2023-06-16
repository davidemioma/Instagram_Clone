import { useEffect, useState } from "react";
import { LikeProps } from "@/types";
import { db } from "@/libs/firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import usePostById from "./usePostById";
import useCurrentUser from "./useCurrentUser";
import useNotifications from "./useNotification";

const useLike = (postId: string) => {
  const currentUser = useCurrentUser();

  const [hasLiked, setHasLiked] = useState(false);

  const [likes, setLikes] = useState<LikeProps[]>([]);

  const post = usePostById(postId);

  const { turnOnNotifications } = useNotifications(post?.userId!);

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
    if (!currentUser?.id) return;

    if (hasLiked) {
      await deleteDoc(doc(db, "posts", postId, "likes", `${currentUser?.id}`));
    } else {
      await setDoc(doc(db, "posts", postId, "likes", `${currentUser?.id}`), {
        displayName: currentUser?.displayName,
        timestamp: serverTimestamp(),
      });

      if (`${post?.userId}` !== `${currentUser?.id}`) {
        await addDoc(
          collection(db, "users", `${post?.userId}`, "notifications"),
          {
            task: "like",
            userId: `${currentUser?.id}`,
            timestamp: serverTimestamp(),
          }
        );

        turnOnNotifications();
      }
    }
  };

  return { likes, hasLiked, likePost };
};

export default useLike;
