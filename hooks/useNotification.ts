import { useEffect, useState } from "react";
import { db } from "@/libs/firebase";
import { NotificationProps } from "@/types";
import useCurrentUser from "./useCurrentUser";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";

const useNotifications = (userId?: string) => {
  const currentUser = useCurrentUser();

  const [notifications, setNotifications] = useState<NotificationProps[]>([]);

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "users", `${currentUser?.id}`, "notifications"),
          orderBy("timestamp", "desc")
        ),
        (snapshot) =>
          setNotifications(
            snapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() }))
          )
      ),
    [currentUser?.id]
  );

  const turnOnNotifications = async () => {
    if (!userId) return;

    await updateDoc(doc(db, "users", userId), {
      hasNotification: true,
    });
  };

  const turnOffNotifications = async () => {
    if (!userId) return;

    await updateDoc(doc(db, "users", userId), {
      hasNotification: false,
    });
  };

  const turnOffMessagesNotifications = async () => {
    if (!userId) return;

    await updateDoc(doc(db, "users", userId), {
      hasMessage: false,
    });
  };

  return {
    notifications,
    turnOnNotifications,
    turnOffNotifications,
    turnOffMessagesNotifications,
  };
};

export default useNotifications;
