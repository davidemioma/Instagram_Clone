import { useEffect, useState } from "react";
import { db } from "@/libs/firebase";
import { PostProps } from "@/types";
import { onSnapshot, collection, orderBy, query } from "@firebase/firestore";

const usePosts = () => {
  const [posts, setPosts] = useState<PostProps[]>([]);

  useEffect(
    () =>
      onSnapshot(
        query(collection(db, "posts"), orderBy("timestamp", "desc")),
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

export default usePosts;
