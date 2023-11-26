import Tab from "@/components/Tab";
import useTab from "@/components/Tab/useTab";
import UserDetails from "./UserDetails";
import useTabConfig from "./useTabConfig";
import useUser from "./useUser";
import UserAuctions from "./UserAuctions";

const UserPage = () => {
  const viewTabConfig = useTabConfig();
  const viewTab = useTab(viewTabConfig);
  const user = useUser();

  return (
    <div className="flex flex-col gap-[2rem] min-h-full max-w-[72rem]">
      <div className="flex flex-col gap-[2rem] flex-1">
        <UserDetails user={user} />
        <Tab
          getTabClickHandler={viewTab.getTabClickHandler}
          items={viewTab.items}
          selectedTabIdx={viewTab.selectedTabIdx}
        />
        {viewTab.selectedTab.id === "auctions" ? <UserAuctions /> : null}
      </div>
    </div>
  );
};

export default UserPage;
