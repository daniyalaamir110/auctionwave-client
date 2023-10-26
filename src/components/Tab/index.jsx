const TabItem = ({
  text = "",
  icon = null,
  onClick = () => {},
  selected = false,
}) => {
  return (
    <button
      className={`w-[7rem] shrink-0 px-[0.5rem] py-[1rem] text-left text-sm hover:bg-neutral-50 active:bg-neutral-100 rounded-lg transition-all flex flex-row items-center gap-[0.25rem] ${
        selected ? "text-blue-700" : "text-black"
      }`}
      onClick={onClick}
    >
      <div>{icon}</div>
      <div>{text}</div>
    </button>
  );
};

const Tab = ({
  getTabClickHandler = () => {},
  selectedTabIdx = 0,
  items = [],
}) => {
  return (
    <div className="flex flex-row items-center relative w-full overflow-scroll">
      {items.map((item, idx) => (
        <TabItem
          key={idx}
          text={item.name}
          icon={item.icon}
          selected={idx === selectedTabIdx}
          onClick={getTabClickHandler(idx)}
        />
      ))}
      {!!items?.length && (
        <div
          className="w-[7rem] pl-[1.75rem] absolute bottom-0 left-0 transition-all duration-300"
          style={{ transform: `translateX(${selectedTabIdx * 100}%)` }}
        >
          <div className="w-[1.5rem] bg-blue-700 h-[0.125rem] rounded-full" />
        </div>
      )}
    </div>
  );
};

export default Tab;
