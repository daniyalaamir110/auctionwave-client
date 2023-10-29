const MyAuctionItemLoading = () => {
  return (
    <div className="p-[1rem] rounded-lg shadow-md bg-neutral-50 flex flex-row gap-[1rem] animate-pulse">
      <div className="w-[6rem] sm:w-[12rem] h-[6rem] sm:h-[12rem] bg-neutral-100 rounded-md shrink-0" />
      <div className="flex flex-col gap-[1rem] items-start w-full">
        <div className="min-w-[6rem] max-w-[12rem] w-full h-[2rem] rounded bg-neutral-200" />
        <div className="w-full h-[3rem] rounded bg-neutral-200" />
        <div className="min-w-[6rem] max-w-[12rem] w-full h-[1.4rem] rounded bg-neutral-200" />
        <div className="min-w-[6rem] max-w-[8rem] w-full h-[2.5rem] rounded bg-neutral-200" />
      </div>
    </div>
  );
};

export default MyAuctionItemLoading;
