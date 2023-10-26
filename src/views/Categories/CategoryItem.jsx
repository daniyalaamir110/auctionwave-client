import { useNavigate } from "react-router-dom";

const CategoryItem = ({ title = "", image = "", categoryId = null }) => {
  const navigate = useNavigate();
  return (
    <div className="h-[12rem] xl:w-[calc((100%/3)-2rem*((3-1)/3))] lg:w-[calc((100%/2)-2rem*((2-1)/2))] w-[calc((100%/1)-2rem*((1-1)/3))] shadow-md rounded-md relative overflow-hidden hover:shadow-2xl transition-all hover:scale-105">
      <img
        className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] min-w-full min-h-full object-cover"
        src={image}
        alt={title}
        width={100}
        loading="lazy"
      />
      {/* Overlay */}
      <button
        onClick={() => {
          if (categoryId) {
            navigate(`/app/auctions?category=${categoryId}`);
          }
        }}
        className="absolute top-0 left-0 flex h-full w-full flex-col items-end justify-end p-[1rem] bg-gradient-to-b from-[#0000] to-[#0008] hover:bg-[#0002] transition-all"
      >
        <h3 className="w-fit text-white text-3xl text-right">{title}</h3>
      </button>
    </div>
  );
};

export default CategoryItem;
