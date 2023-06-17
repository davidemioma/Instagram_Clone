import { useCallback, useEffect, useState } from "react";
import { db } from "@/libs/firebase";
import { AccountProps } from "@/types";
import useCurrentUser from "./useCurrentUser";
import { collection, onSnapshot } from "firebase/firestore";

const useSearchedUsers = (searchTerm: string) => {
  const currentUser = useCurrentUser();

  const [text, setText] = useState(searchTerm);

  const [users, setUsers] = useState<AccountProps[]>([]);

  const [searchedUsers, setSearchedUsers] = useState<AccountProps[]>([]);

  useEffect(() => {
    const textTimer = setTimeout(() => {
      setText(searchTerm);
    }, 300);

    return () => {
      clearTimeout(textTimer);
    };
  }, [searchTerm]);

  useEffect(
    () =>
      onSnapshot(collection(db, "users"), (snapshot) => {
        const users = snapshot.docs
          .map((doc: any) => ({
            id: doc.id,
            ...doc.data(),
          }))
          .filter((user) => user.id !== `${currentUser?.id}`);

        setUsers(users);
      }),
    [currentUser?.id]
  );

  const handleSearch = useCallback(() => {
    if (text === "") {
      setSearchedUsers([]);

      return;
    }

    const searchedUsers = users.filter((user) =>
      user.displayName.toLowerCase().includes(text.toLowerCase())
    );

    setSearchedUsers(searchedUsers);
  }, [users, text]);

  useEffect(() => {
    handleSearch();
  }, [handleSearch]);

  return searchedUsers;
};

export default useSearchedUsers;
