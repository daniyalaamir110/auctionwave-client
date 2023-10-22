import React from "react";
import Avatar from "../Avatar";

const UserItem = ({ user }) => {
  if (!user) return null;

  const name =
    `${user.first_name} ${user.last_name}`.trim() || `User ${user.id}`;

  return (
    <div className="flex flex-row gap-[1rem] items-start">
      <Avatar />
      <div className="flex flex-col">
        <h3 className="text-md text-blue-700">{name}</h3>
        <p className="text-xs">@{user.username}</p>
      </div>
    </div>
  );
};

export default UserItem;
