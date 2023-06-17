import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import { BiX } from "react-icons/bi";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
import Suggestion from "../chat/Suggestion";
import SearchedUser from "../chat/SearchedUser";
import useFollowing from "@/hooks/useFollowing";
import useCurrentUser from "@/hooks/useCurrentUser";
import { AccountProps, followProps } from "@/types";
import useSearchedUsers from "@/hooks/useSearchedUsers";
import { generateId, getRandomUsers } from "@/utils/functions";
import useConversationModal from "@/hooks/useConversationModal";
import useCreateChat from "@/hooks/useCreateChat";

const ConversationModal = () => {
  const router = useRouter();

  const currentUser = useCurrentUser();

  const conversationModal = useConversationModal();

  const [loading, setLoading] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");

  const { followings } = useFollowing(`${currentUser?.id}`);

  const [randoms, setRandoms] = useState<followProps[]>([]);

  const [selected, setSelected] = useState<AccountProps | null>(null);

  const searchedUsers = useSearchedUsers(searchTerm);

  const createChat = useCreateChat(`${selected?.id!}`);

  const onCloseHandler = () => {
    conversationModal.onClose();

    setSelected(null);
  };

  const onSelectHandler = (account: AccountProps) => {
    setSelected((prev) => {
      if (prev?.id === account.id) {
        return null;
      } else {
        return account;
      }
    });
  };

  const createConvoHandler = async () => {
    if (!selected) return;

    setLoading(true);

    try {
      const id = generateId(currentUser?.id, selected?.id);

      await createChat(id);

      toast.success("Chat created");

      setSelected(null);

      conversationModal.onClose();

      router.push(`/chats/${id}`);
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const randomFollowings = getRandomUsers(followings, 5);

    setRandoms(randomFollowings);
  }, [followings]);

  return (
    <Modal
      className="bg-white w-full max-w-sm h-[60vh] rounded-lg"
      isOpen={conversationModal.isOpen}
      onClose={onCloseHandler}
    >
      <div className="w-full h-full">
        <div className="flex items-center justify-between h-12 px-3 border-b">
          <BiX size={25} onClick={onCloseHandler} />

          <span className="font-semibold">New Message</span>

          <button
            className="text-sm text-blue-400 font-semibold disabled:opacity-75 disabled:cursor-default"
            onClick={createConvoHandler}
            disabled={!selected || loading}
          >
            Next
          </button>
        </div>

        <div className="flex items-center gap-3 p-3 text-sm">
          <span>To: </span>

          <input
            className="flex-1 focus:outline-none"
            value={searchTerm}
            type="text"
            disabled={loading}
            placeholder="Search..."
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {searchedUsers.length > 0 && (
          <div className="flex flex-col gap-2 h-full overflow-y-auto scrollbar-hide">
            {searchedUsers.map((account) => (
              <SearchedUser
                key={account.id}
                account={account}
                selected={selected}
                onClick={() => onSelectHandler(account)}
              />
            ))}
          </div>
        )}

        {searchedUsers.length === 0 && !searchTerm.trim() && (
          <div className="flex flex-col gap-4 py-3 mt-1">
            <span className="text-sm px-3 font-semibold">Suggested</span>

            <div className="flex flex-col gap-2 h-full overflow-y-auto scrollbar-hide">
              {randoms.map((following) => (
                <Suggestion
                  key={following.id}
                  following={following}
                  selected={selected}
                  setSelected={setSelected}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default ConversationModal;
