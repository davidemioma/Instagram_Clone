import { useEffect, useState } from "react";
import { followProps } from "@/types";
import { db } from "@/libs/firebase";
import useCurrentUser from "./useCurrentUser";
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
import useNotifications from "./useNotification";

const useFollowing = (userId: string) => {
  const currentUser = useCurrentUser();

  const { turnOnNotifications } = useNotifications(userId);

  const [isFollowing, setIsFollowing] = useState(false);

  const [followers, setFollowers] = useState<followProps[]>([]);

  const [followings, setFollowings] = useState<followProps[]>([]);

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "users", `${currentUser?.id}`, "followers"),
          orderBy("timestamp", "desc")
        ),
        (snapshot: any) =>
          setFollowers(
            snapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() }))
          )
      ),
    [currentUser?.id]
  );

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "users", `${currentUser?.id}`, "followings"),
          orderBy("timestamp", "desc")
        ),
        (snapshot: any) =>
          setFollowings(
            snapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() }))
          )
      ),
    [currentUser?.id]
  );

  useEffect(
    () =>
      setIsFollowing(
        followings?.findIndex((following) => following?.id === userId) !== -1
      ),
    [followings, userId]
  );

  const followUser = async () => {
    if (!userId) return;

    if (isFollowing) {
      await deleteDoc(
        doc(db, "users", `${currentUser?.id}`, "followings", userId)
      );

      await deleteDoc(
        doc(db, "users", userId, "followers", `${currentUser?.id}`)
      );
    } else {
      await setDoc(
        doc(db, "users", `${currentUser?.id}`, "followings", userId),
        {
          timestamp: serverTimestamp(),
        },
        { merge: true }
      );

      await setDoc(
        doc(db, "users", userId, "followers", `${currentUser?.id}`),
        {
          timestamp: serverTimestamp(),
        },
        { merge: true }
      );

      await addDoc(collection(db, "users", userId, "notifications"), {
        task: "follower",
        userId: `${currentUser?.id}`,
        timestamp: serverTimestamp(),
      });

      turnOnNotifications();
    }
  };

  return { followers, followings, isFollowing, followUser };
};

export default useFollowing;
