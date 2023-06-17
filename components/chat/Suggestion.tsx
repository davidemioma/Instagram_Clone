import React, { Dispatch, SetStateAction } from "react";
import SearchedUser from "./SearchedUser";
import useAccountById from "@/hooks/useAccountById";
import { followProps, AccountProps } from "@/types";

interface Props {
  following: followProps;
  selected: AccountProps | null;
  setSelected: Dispatch<SetStateAction<AccountProps | null>>;
}

const Suggestion = ({ following, selected, setSelected }: Props) => {
  const account = useAccountById(`${following.id}`);

  if (!account) return null;

  const onClickHandler = () => {
    setSelected((prev) => {
      if (prev?.id === account.id) {
        return null;
      } else {
        return account;
      }
    });
  };

  return (
    <SearchedUser
      account={account}
      selected={selected}
      onClick={onClickHandler}
    />
  );
};

export default Suggestion;
