import UserItem from "@/components/UserItem";
import useAuth from "@/redux/auth/useAuth";
import { formatNumber } from "@/utils";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

const BidsPage = () => {
  const auth = useAuth();
  return (
    <div className="flex flex-col gap-[2rem] min-h-full max-w-[72rem]">
      <div className="flex flex-col gap-[2rem] flex-1 w-full">
        <h1 className="sm:text-4xl text-3xl">Your Bids</h1>
        <div className="relative overflow-x-auto w-full pb-[0.675rem] rounded-lg border border-neutral-200">
          <table className="w-full text-sm text-left text-neutral-500">
            <thead className="text-xs text-neutral-700 uppercase bg-neutral-50">
              <tr>
                <th scope="col" className="px-6 py-3">
                  S#
                </th>
                <th scope="col" className="px-6 py-3">
                  Auction Item
                </th>
                <th scope="col" className="px-6 py-3">
                  Auctioneer
                </th>
                <th scope="col" className="px-6 py-3">
                  Bid Amount
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Rank
                </th>
              </tr>
            </thead>
            <tbody>
              {[...new Array(10)].map((_, idx) => (
                <tr
                  key={idx}
                  className="bg-white border-b border-b-neutral-200 hover:bg-neutral-50"
                >
                  <td className="px-6 py-4 min-w-max whitespace-nowrap">1</td>
                  <td className="px-6 py-4 min-w-max whitespace-nowrap">
                    <Link
                      to="/app/auctions/1"
                      className="underline text-blue-700 hover:text-blue-800 active:text-blue-900 flex flex-row items-center gap-[0.25rem]"
                    >
                      Honda Accord 2005
                      <ArrowTopRightOnSquareIcon
                        width={16}
                        className="inline"
                      />
                    </Link>
                  </td>
                  <td className="px-6 py-4 min-w-max whitespace-nowrap">
                    <UserItem user={auth.state.user} />
                  </td>
                  <td className="px-6 py-4 min-w-max whitespace-nowrap">
                    {formatNumber(2800000)}
                  </td>
                  <td className="px-6 py-4 min-w-max whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div>{" "}
                      Ongoing
                    </div>
                  </td>
                  <td className="px-6 py-4 min-w-max whitespace-nowrap">#2</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BidsPage;
