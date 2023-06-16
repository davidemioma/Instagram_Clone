import { useEffect, useState } from "react";
import { db } from "@/libs/firebase";
import { AccountProps } from "@/types";
import useCurrentUser from "./useCurrentUser";
import { collection, onSnapshot, query, where } from "firebase/firestore";

const useAccounts = () => {
  const currentUser = useCurrentUser();

  const [accounts, setAccounts] = useState<AccountProps[]>([]);

  const [followingIds, setFollowingIds] = useState<string[]>([]);

  useEffect(
    () =>
      onSnapshot(
        collection(db, "users", `${currentUser?.id}`, "following"),
        (snapshot) => setFollowingIds(snapshot.docs.map((doc) => doc.id))
      ),
    [currentUser?.id]
  );

  useEffect(
    () =>
      onSnapshot(collection(db, "users"), (snapshot) => {
        const allUsers = snapshot.docs.map((doc: any) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const usersToRemove = [...followingIds, `${currentUser?.id}`];

        setAccounts(
          allUsers.filter((user) => !usersToRemove.includes(user.id))
        );
      }),
    [followingIds, currentUser?.id]
  );

  return accounts;
};

export default useAccounts;
