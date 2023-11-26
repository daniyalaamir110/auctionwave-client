import { getTimeLeft } from "@/utils";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Note from "../Note";

const AuctionsScrolView = ({
  title = "",
  loading = false,
  auctions = [],
  emptyText = "Nothing to show",
  icon = <ClockIcon width={24} />,
  btn = null,
}) => {
  const auctionsRef = useRef();
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);

  useEffect(() => {
    const current = auctionsRef.current;
    const handleScroll = () => {
      const { scrollLeft, scrollWidth, clientWidth } = current;

      setShowLeftButton(scrollLeft > 0);

      setShowRightButton(scrollLeft < scrollWidth - clientWidth);
    };

    handleScroll();

    current?.addEventListener("scroll", handleScroll);

    return () => {
      current?.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const onMoreAuctionsScroll = (x) => {
    auctionsRef.current?.scrollBy({ left: x, behavior: "smooth" });
  };

  return (
    <div className="relative max-w-[74rem] w-full">
      <div className="flex sm:flex-row flex-col justify-between gap-[1rem] sm:items-center py-[1rem]">
        <div className="flex flex-row gap-[0.5rem] items-center">
          {icon}
          <h2 className="text-2xl">{title}</h2>
        </div>
        {btn}
      </div>
      {!loading && !auctions?.length && <Note text={emptyText} />}
      <div
        className="overflow-x-scroll flex flex-row gap-[1rem] items-center justify-start"
        ref={auctionsRef}
      >
        {loading
          ? [...new Array(5)].map((_, idx) => (
              <div
                className="w-[16rem] h-[16rem] rounded-lg shadow-md bg-neutral-100 shrink-0 animate-pulse"
                key={idx}
              />
            ))
          : auctions?.map((item) => (
              <Link
                key={item.id}
                to={`/app/auctions/${item.id}`}
                className="w-[16rem] h-[16rem] rounded-lg shadow-md shrink-0 flex flex-row items-center justify-center overflow-x-hidden relative hover:shadow-lg transition-all"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="min-w-full min-h-full object-cover"
                />
                <div className="bg-neutral-900 bg-opacity-50 absolute bottom-0 left-0 p-[1rem]">
                  <h3 className="w-full text-white text-xl line-clamp-2 overflow-hidden select-none font-bold">
                    {item.title}
                  </h3>
                  <p className="text-sm text-white">
                    Ends {getTimeLeft(item.valid_till)}
                  </p>
                </div>
              </Link>
            ))}
      </div>
      {!!auctions?.length && (
        <>
          {showLeftButton && (
            <button
              className="absolute top-[50%] left-[1rem] -translate-y-[50%] h-[3rem] w-[3rem] shadow-lg bg-white rounded-full flex flex-col items-center justify-center hover:scale-110 transition-all"
              onClick={() => onMoreAuctionsScroll(-17 * 16)}
            >
              <ChevronLeftIcon width={20} />
            </button>
          )}
          {showRightButton && (
            <button
              className="absolute top-[50%] right-[1rem] -translate-y-[50%] h-[3rem] w-[3rem] shadow-lg bg-white rounded-full flex flex-col items-center justify-center hover:scale-110 transition-all"
              onClick={() => onMoreAuctionsScroll(17 * 16)}
            >
              <ChevronRightIcon width={20} />
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default AuctionsScrolView;
