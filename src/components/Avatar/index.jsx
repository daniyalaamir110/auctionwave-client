import DefaultAvatarSrc from "@/assets/images/default-avatar.jpg";
import LoadingSpinner from "../LoadingSpinner";

const Avatar = ({ loading = false }) => {
  return (
    <div className="w-[3rem] h-[3rem] rounded-full border-[2px] border-blue-700 flex flex-row items-center justify-center overflow-hidden shadow-md bg-white text-blue-700">
      {loading ? (
        <LoadingSpinner />
      ) : (
        <img src={DefaultAvatarSrc} alt="avatar" className="w-full" />
      )}
    </div>
  );
};

export default Avatar;
