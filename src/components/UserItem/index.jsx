import React, { memo } from "react";
import Avatar from "../Avatar";
import { Link } from "react-router-dom";

export const UserItemLoading = memo(() => {
  return (
    <div className="flex flex-row gap-[1rem] items-center">
      <div className="shrink-0 w-[3rem] h-[3rem] rounded-full bg-neutral-200" />
      <div className="flex flex-col gap-[0.5rem] hover:scale-105 transition-all">
        <div className="rounded-md w-[6rem] bg-neutral-200 h-[1.25rem]" />
        <div className="rounded-md w-[4rem] bg-neutral-200 h-[1rem]" />
      </div>
    </div>
  );
});

const UserItem = ({ user }) => {
  if (!user) return null;

  const name =
    `${user.first_name} ${user.last_name}`.trim() || `User ${user.id}`;

  return (
    <div className="flex flex-row gap-[1rem] items-center">
      <div className="shrink-0">
        <Avatar src={user?.profile_image} />
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
