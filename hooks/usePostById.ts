import { useEffect, useState } from "react";
import { db } from "@/libs/firebase";
import { PostProps } from "@/types";
import { onSnapshot, doc } from "@firebase/firestore";

const usePostById = (id: string) => {
  const [post, setPost] = useState<PostProps | null>(null);

  useEffect(
    () =>
      onSnapshot(doc(db, "posts", id), (snapshot: any) => {
        setPost({
          id: snapshot.id,
          ...snapshot.data(),
        });
      }),
    [id]
  );

  return post;
};

export default usePostById;
