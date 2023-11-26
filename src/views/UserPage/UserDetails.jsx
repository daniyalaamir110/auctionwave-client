import Avatar from "@/components/Avatar";
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import React from "react";
import { Navigate } from "react-router-dom";

const UserDetails = ({ user }) => {
  if (user.status.loading) {
    return (
      <div className="p-[2rem] w-full bg-gradient-to-br from-neutral-50 to-neutral-100 rounded-2xl flex flex-col items-center md:flex-row gap-[2rem]">
        <Avatar large loading />
        <div className="flex-1 h-[12rem] rounded-lg bg-neutral-200 animate-pulse" />
      </div>
    );
  } else if (user.status.error || !user.status.data) {
    return <Navigate to="/app/dashboard" />;
  } else {
    return (
      <div className="p-[2rem] w-full bg-gradient-to-br from-navy-500 to-blue-700 rounded-2xl flex flex-col items-center md:flex-row gap-[2rem] shadow-lg">
        <Avatar large src={user.status.data.profile_image} />
        <div className="flex flex-col gap-[1rem] flex-1">
          <h2 className="text-white text-5xl">
            {`${user.status.data.first_name} ${user.status.data.last_name}`.trim()}
          </h2>
          <p className="text-blue-100 text-xl">@{user.status.data.username}</p>
          <hr className="border-blue-300" />
          <div className="flex flex-row gap-[0.5rem] text-white">
            <EnvelopeIcon width={20} />
            <p className="text-blue-100 text-md">{user.status.data.email}</p>
          </div>
        </div>
      </div>
    );
  }
};

export default UserDetails;
