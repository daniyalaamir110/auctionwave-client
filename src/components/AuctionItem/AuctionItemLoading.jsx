const AuctionItemLoading = () => {
  return (
    <div className="xl:w-[calc((100%/3)-2rem*((3-1)/3))] lg:w-[calc((100%/2)-2rem*((2-1)/2))] shadow rounded-md flex flex-col overflow-hidden animate-pulse">
      <div className="w-full h-[16rem] overflow-hidden bg-neutral-200" />
      <div className="p-[1rem] flex flex-col gap-[1rem]">
        <div className="bg-neutral-200 p-[0.75rem] rounded-md w-[3rem]" />
        <div>
          <div className="p-[0.625rem] my-[0.2rem] bg-neutral-200 rounded w-[12rem]" />
          <div className="bg-neutral-200 p-[0.5rem] rounded w-[6rem]" />
        </div>
        <div className="bg-neutral-200 h-[2.5rem] rounded" />
        <div className="bg-neutral-200 h-[6rem] rounded" />
        <div className="bg-neutral-200 h-[2.5rem] rounded" />
      </div>
    </div>
  );
};

export default AuctionItemLoading;
