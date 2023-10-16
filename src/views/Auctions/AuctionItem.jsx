import Button from "@/components/Button";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import ImageNotFoundSrc from "@/assets/images/image-not-found.svg";

const TimeLeft = ({ value = 45 }) => {
  return (
    <div className="w-full max-w-[180rem] flex flex-col gap-[0.25rem] items-end">
      <div className="w-full bg-blue-200 rounded-full overflow-hidden">
        <div className={`bg-blue-700 w-[${value}%] p-[0.125rem]`} />
      </div>
      <p className="text-[0.625rem] text-neutral-600">1 DAY LEFT</p>
    </div>
  );
};

const AuctionItem = () => {
  return (
    <div className="xl:w-[calc((100%/3)-2rem*((3-1)/3))] lg:w-[calc((100%/2)-2rem*((2-1)/2))] shadow-md rounded-md flex flex-col overflow-hidden">
      <div className="flex flex-col items-center justify-center">
        <div className="w-full h-[16rem] flex flex-col items-center justify-center overflow-hidden">
          {/* <img
            src={ImageNotFoundSrc}
            alt="Not found"
            className="max-w-[8rem] max-h-[8rem] object-cover"
          /> */}
          <img
            src="https://edgecast-img.yahoo.net/mysterio/api/1AB9D71DA2AC883590B5893D8393F54084A48CD4CF9B713795FEB576D14EBEFE/autoblog/resizefill_w1200_h675;quality_80;format_webp;cc_31536000;/http://s.aolcdn.com/commerce/blogcdn/www.autoblog.com/media/2010/11/01-2005-honda-accord-hybrid.jpg"
            alt="Honda Accord 2005"
            className="min-w-full min-h-full object-cover"
          />
        </div>
      </div>
      <div className="p-[1rem] flex flex-col gap-[1rem]">
        <p className="bg-green-100 p-[0.25rem] text-xs text-green-700 rounded-md w-fit">
          Cars
        </p>
        <div>
          <h2 className="text-xl">Honda Accord 2005</h2>
          <p className="text-xs text-neutral-400">2 DAYS AGO</p>
        </div>
        <p className="text-sm text-neutral-600 line-clamp-2">
          Immaculate 2005 Honda Accord in Silverstone - Low Mileage, Full
          Options, Pristine Condition!
        </p>
        <div>
          <h3 className="text-xs text-neutral-900">BASE PRICE</h3>
          <p className="text-blue-700">
            <span className="text-xs">PKR </span>2,800,000
          </p>
          <div className="flex flex-row py-[1rem]">
            <TimeLeft value={33} />
          </div>
        </div>
        <Button
          text="View Details"
          variant="secondary"
          rightIcon={<ArrowTopRightOnSquareIcon width={16} />}
        />
      </div>
    </div>
  );
};

export default AuctionItem;
