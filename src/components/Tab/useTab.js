import useQuery from "@/hooks/useQuery";
import { useEffect, useState } from "react";

const useTab = ({
  items = [],
  getInitialTabIdx = () => 0,
  onTabChange = (tab) => {},
}) => {
  const initialIdx = getInitialTabIdx();
  const [selectedTabIdx, setSelectedTabIdx] = useState(initialIdx);
  const query = useQuery();

  const getTabClickHandler = (idx) => () => {
    setSelectedTabIdx(idx);
  };

  const selectedTab = items[selectedTabIdx];

  useEffect(() => {
    onTabChange(selectedTab);
  }, [selectedTabIdx]);

  useEffect(() => {
    setSelectedTabIdx(getInitialTabIdx());
  }, [query]);

  return { getTabClickHandler, selectedTabIdx, selectedTab, items };
};

export default useTab;
