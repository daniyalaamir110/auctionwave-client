import { InformationCircleIcon } from "@heroicons/react/24/outline";
import LoadingItems from "../LoadingItems";
import { memo } from "react";

const Note = memo(({ text, loading = false }) => {
  return (
    <div className="flex flex-row gap-[0.5rem] p-[1rem] bg-blue-100 rounded-lg text-blue-800 text-md items-start shadow-md">
      {loading ? (
        <LoadingItems text={text} />
      ) : (
        <>
          <div className="pt-[0.25rem]">
            <InformationCircleIcon width={16} />
          </div>
          <p>{text}</p>
        </>
      )}
    </div>
  );
});

export default Note;
