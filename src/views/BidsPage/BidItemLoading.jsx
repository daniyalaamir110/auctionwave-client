import { UserItemLoading } from "@/components/UserItem";

const BidItemLoading = () => {
  return (
    <tr className="bg-neutral-50 border-b border-b-neutral-200 hover:bg-neutral-50 animate-pulse">
      <td className="px-6 py-4 min-w-max whitespace-nowrap">
        <div className="rounded-md w-[1.25rem] bg-neutral-200 h-[1.25rem]" />
      </td>
      <td className="px-6 py-4 min-w-max whitespace-nowrap">
        <div className="rounded-md w-[6rem] bg-neutral-200 h-[1.25rem]" />
      </td>
      <td className="px-6 py-4 min-w-max whitespace-nowrap">
        <UserItemLoading />
      </td>
      <td className="px-6 py-4 min-w-max whitespace-nowrap">
        <div className="rounded-md w-[6rem] bg-neutral-200 h-[1.25rem]" />
      </td>
      <td className="px-6 py-4 min-w-max whitespace-nowrap">
        <div className="rounded-md w-[5rem] bg-neutral-200 h-[1.25rem]" />
      </td>
      <td className="px-6 py-4 min-w-max whitespace-nowrap">
        <div className="rounded-md w-[1.25rem] bg-neutral-200 h-[1.25rem]" />
      </td>
    </tr>
  );
};

export default BidItemLoading;
