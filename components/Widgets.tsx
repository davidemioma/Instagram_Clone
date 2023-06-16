import React from "react";
import Avatar from "./Avatar";
import useAccounts from "@/hooks/useAccounts";
import useCurrentUser from "@/hooks/useCurrentUser";
import Account from "./Account";

const Widgets = () => {
  const accounts = useAccounts();

  const currentUser = useCurrentUser();

  return (
    <div className="hidden lg:inline fixed z-0 top-16 right-0 w-[45%] py-7 pl-7">
      <div className="flex items-center space-x-3 my-4">
        <Avatar user={currentUser} />

        <p className="text-sm font-bold">{currentUser?.displayName}</p>
      </div>

      <p className="text-gray-500 font-semibold">Suggestions for you</p>

      <div className="py-4 px-2">
        {accounts.map((account) => (
          <Account key={account.id} account={account} />
        ))}
      </div>
    </div>
  );
};

export default Widgets;
