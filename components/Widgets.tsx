import React from "react";
import Avatar from "./Avatar";
import useAccounts from "@/hooks/useAccounts";
import useCurrentUser from "@/hooks/useCurrentUser";
import Account from "./Account";

const Widgets = () => {
  const accounts = useAccounts();

  const currentUser = useCurrentUser();

  const terms = [
    "About",
    "Help",
    "Press",
    "API",
    "Jobs",
    "Privacy",
    "Terms",
    "Locations",
    "Language",
    "English",
    "Meta",
    "Verified",
  ];

  return (
    <div className="hidden lg:inline fixed z-0 top-16 right-0 w-[45%] py-7 pl-7">
      <div className="flex items-center space-x-3 my-4">
        <Avatar user={currentUser} />

        <p className="text-sm font-bold">{currentUser?.displayName}</p>
      </div>

      <p className="text-gray-500 font-semibold">Suggestions for you</p>

      <div className="py-4 px-2 w-full max-w-xs">
        {accounts.map((account) => (
          <Account key={account.id} account={account} />
        ))}
      </div>

      <div className="flex flex-wrap gap-1 w-full max-w-[250px] text-xs text-gray-500 mb-5 overflow-hidden">
        {terms.map((item, i) => (
          <div key={i} className="flex items-center gap-1">
            <span className="hover:underline cursor-pointer">{item}</span>

            {i !== item.length - 1 && <span>.</span>}
          </div>
        ))}
      </div>

      <p className="text-gray-500 text-sm">© 2023 David Emioma</p>
    </div>
  );
};

export default Widgets;
