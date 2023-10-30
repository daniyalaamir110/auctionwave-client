import DefaultAvatarSrc from "@/assets/images/default-avatar.jpg";
import LoadingSpinner from "../LoadingSpinner";
import { memo } from "react";

const Avatar = memo(({ loading = false, large = false }) => {
  const length = `${large ? 15.125 : 3}rem`;
  return (
    <div
      className="w-[3rem] h-[3rem] rounded-full border-[2px] border-blue-700 flex flex-row items-center justify-center overflow-hidden shadow-md bg-white text-blue-700"
      style={{
        width: length,
        height: length,
      }}
    >
      {loading ? (
        <LoadingSpinner />
      ) : (
        <img src={DefaultAvatarSrc} alt="avatar" className="w-full" />
      )}
    </div>
  );
});

export default Avatar;
