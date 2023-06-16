import { useEffect, useState } from "react";
import { db } from "@/libs/firebase";
import { PostProps } from "@/types";
import {
  onSnapshot,
  collection,
  orderBy,
  query,
  where,
} from "@firebase/firestore";

const usePostsByUserId = (userId: string) => {
  const [posts, setPosts] = useState<PostProps[]>([]);

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "posts"),
          where("userId", "==", userId)
          //   orderBy("timestamp", "desc")
        ),
        (snapshot) =>
          setPosts(
            snapshot.docs.map((doc: any) => ({
              id: doc.id,
              ...doc.data(),
            }))
          )
      ),
    []
  );

  return posts;
};

export default usePostsByUserId;
