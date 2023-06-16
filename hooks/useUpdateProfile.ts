import useCurrentUser from "./useCurrentUser";
import { db, storage } from "@/libs/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";

interface Props {
  phoneNo: string;
  selectedFile?: string;
}

const useUpdateProfile = () => {
  const currentUser = useCurrentUser();

  const updateProfile = async ({ phoneNo, selectedFile }: Props) => {
    const imageRef = ref(storage, `posts/${currentUser?.id}/profile`);

    if (selectedFile) {
      await uploadString(imageRef, selectedFile, "data_url").then(
        async (snapshot) => {
          const downloadUrl = await getDownloadURL(imageRef);

          await updateDoc(doc(db, "users", `${currentUser?.id}`), {
            phoneNo,
            profileUrl: downloadUrl,
          });
        }
      );
    } else {
      await updateDoc(doc(db, "users", `${currentUser?.id}`), {
        phoneNo,
      });
    }
  };

  return updateProfile;
};

export default useUpdateProfile;
