import React from "react";
import Avatar from "../Avatar";
import { Link } from "react-router-dom";

const UserItem = ({ user }) => {
  if (!user) return null;

  const name =
    `${user.first_name} ${user.last_name}`.trim() || `User ${user.id}`;

  return (
    <div className="flex flex-row gap-[1rem] items-center">
      <div className="shrink-0">
        <Avatar />
      </div>
      <Link
        to={`/app/users/${user.id}`}
        className="flex flex-col hover:scale-105 transition-all"
      >
        <h3 className="text-md text-blue-700">
          {name}
          {user.is_self ? " (You)" : ""}
        </h3>
        <p className="text-xs">@{user.username}</p>
      </Link>
    </div>
  );
};

export default UserItem;
