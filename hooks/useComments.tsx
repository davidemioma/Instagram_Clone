import { useEffect, useState } from "react";
import { db } from "@/libs/firebase";
import { CommentProps } from "@/types";
import useCurrentUser from "./useCurrentUser";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";

const useComments = (postId: string) => {
  const currentUser = useCurrentUser();

  const [comments, setComments] = useState<CommentProps[]>([]);

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "posts", postId, "comments"),
          orderBy("timestamp", "desc")
        ),
        (snapshot: any) =>
          setComments(
            snapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() }))
          )
      ),
    [postId]
  );

  const addComment = async (comment: string) => {
    await addDoc(collection(db, "posts", postId, "comments"), {
      userId: currentUser?.id,
      comment,
      timestamp: serverTimestamp(),
    });
  };

  return { comments, addComment };
};

export default useComments;
