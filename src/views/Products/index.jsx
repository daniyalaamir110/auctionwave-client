import Button from "@/components/Button";
import TextInput from "@/components/TextInput";
import useQuery from "@/hooks/useQuery";
import {
  ArrowTopRightOnSquareIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

const TimeLeft = () => {
  return (
    <div className="w-full max-w-[180rem] flex flex-col gap-[0.25rem] items-end">
      <div className="w-full bg-blue-200 rounded-full overflow-hidden">
        <div className="bg-blue-700 w-[calc(100%/3)] p-[0.125rem]" />
      </div>
      <p className="text-[0.625rem] text-neutral-600">1 DAY LEFT</p>
    </div>
  );
};

const Product = () => {
  return (
    <div className="xl:w-[calc((100%/3)-2rem*((3-1)/3))] lg:w-[calc((100%/2)-2rem*((2-1)/2))] shadow-md rounded-md flex flex-col overflow-hidden">
      <div className="flex flex-col items-center justify-center">
        <img
          src="https://edgecast-img.yahoo.net/mysterio/api/1AB9D71DA2AC883590B5893D8393F54084A48CD4CF9B713795FEB576D14EBEFE/autoblog/resizefill_w1200_h675;quality_80;format_webp;cc_31536000;/http://s.aolcdn.com/commerce/blogcdn/www.autoblog.com/media/2010/11/01-2005-honda-accord-hybrid.jpg"
          alt="Honda Accord 2005"
        />
      </div>
      <div className="p-[1rem] flex flex-col gap-[1rem]">
        <p className="bg-green-100 p-[0.25rem] text-xs text-green-700 rounded-md w-fit">
          Cars
        </p>
        <div>
          <h2 className="text-xl">Honda Accord 2005</h2>
          <p className="text-xs text-neutral-400">2 DAYS AGO</p>
        </div>
        <p className="text-sm text-neutral-600">
          Immaculate 2005 Honda Accord in Silverstone - Low Mileage, Full
          Options, Pristine Condition!
        </p>
        <div>
          <h3 className="text-xs text-neutral-900">BASE PRICE</h3>
          <p className="text-blue-700">
            <span className="text-xs">PKR </span>2,800,000
          </p>
          <div className="flex flex-row py-[1rem]">
            <TimeLeft />
          </div>
        </div>
        <Button
          text="View Details"
          variant="secondary"
          rightIcon={<ArrowTopRightOnSquareIcon width={16} />}
        />
        {/* <p>
          {`
            Are you in search of a reliable and stylish companion for your daily drives? Look no further! Presenting this stunning 2005 Honda Accord, a true gem that has been meticulously cared for and is now up for auction. 
            
            🚗 Key Features:
            - Year of Registration: 2005
            - Condition: Mint and Excellent
            - Exterior Color: Silverstone
            - Engine: Sealed and Own, No Compromises
            - Mileage: Only 91,000 km
            - Wheels: Alloy Rims for that Extra Touch of Elegance
            - Entertainment: Aftermarket, Latest Android Panel Installed
            - Convenience: Retractable Mirrors for Easy Parking
            - Luxury: Full Option with Electronic Seats
            - Documentation: All Original Documents Complete
            - Fuel: Petrol Driven, CNG Never Installed
            - Accident History: None, 100% Clean
            - Original Book Available for Verification
            
            This Honda Accord is a true masterpiece, boasting a timeless Silverstone exterior that exudes class and sophistication. With an exceptionally low mileage of just 91,000 km, you can expect years of smooth and trouble-free driving ahead.
            
            The interior is a testament to its excellent condition. The electronic seats provide comfort during long journeys, and the retractable mirrors make parking a breeze. Additionally, an aftermarket, latest Android panel has been installed to keep you connected and entertained on the road.
            
            Rest assured, this Accord has never been involved in any accidents, and all original documents are available for your peace of mind. It has been driven on petrol only, with CNG never installed, ensuring optimal performance.
            
            Don't miss this opportunity to own a pristine 2005 Honda Accord that combines style, reliability, and value. Bid now and experience the pleasure of owning a vehicle that sets the standard for excellence. Act fast; this beauty won't be available for long!
            
            For inquiries or to schedule a viewing, please contact us today. Bid with confidence, and let this remarkable Honda Accord elevate your driving experience to a whole new level.
            `}
        </p> */}
      </div>
    </div>
  );
};

const categories = [
  "Cars",
  "Mobiles",
  "Gadgets",
  "PCs/Laptops",
  "Kitchen",
  "Art",
  "Ornaments",
  "Clothing",
  "Books",
];

const CategoryItem = ({ id = 0, name = "", active = false, all = false }) => {
  return (
    <Link
      to={all ? "/app/products" : `/app/products?category=${id}`}
      className={`text-neutral-60 text-sm transition-all flex flex-row p-[0.125rem] gap-[0.125rem] hover:text-blue-700 rounded-md ${
        active && "font-bold bg-blue-100"
      }`}
    >
      <CheckCircleIcon width={16} visibility={active ? "visible" : "hidden"} />
      {all ? "All categories" : name}
    </Link>
  );
};

const FiltersSection = ({ activeCategoryId = null }) => {
  return (
    <div className="w-[16rem] p-[2rem] h-full overflow-scroll hidden md:block">
      <h2 className="text-2xl text-blue-700">Categories</h2>
      <div className="flex flex-col gap-[0.5rem] py-[1.25rem]">
        <TextInput
          label="Search category"
          placeholder="Enter category name"
          name="searchCategory"
          id="searchCategory"
        />
        <CategoryItem all active={activeCategoryId === null} />
        {categories.map((category, idx) => {
          return (
            <CategoryItem
              name={category}
              id={idx}
              key={idx}
              active={activeCategoryId === idx}
            />
          );
        })}
      </div>
      <Button
        variant="secondary"
        text="View all categories"
        rightIcon={<ArrowTopRightOnSquareIcon width={16} />}
      />
    </div>
  );
};

const Products = () => {
  const query = useQuery();

  let activeCategoryId = query.get("category");
  if (activeCategoryId !== null) {
    activeCategoryId = +activeCategoryId;
  }

  return (
    <div className="flex flex-row justify-between gap-[2rem] h-full flex-wrap">
      <FiltersSection activeCategoryId={activeCategoryId} />
      <div className="flex-1 p-[2rem] h-full flex flex-col gap-[2rem] overflow-scroll">
        <h1 className="text-4xl">Auctions</h1>
        <div className="flex flex-row gap-[2rem] w-full flex-wrap">
          <Product />
          <Product />
          <Product />
          <Product />
          <Product />
          <Product />
          <Product />
          <Product />
          <Product />
          <Product />
        </div>
      </div>
    </div>
  );
};

export default Products;
