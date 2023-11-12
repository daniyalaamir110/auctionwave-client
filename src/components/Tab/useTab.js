import { useEffect, useState } from "react";

const useTab = ({
  items = [],
  getInitialTabIdx = () => 0,
  onTabChange = (tab) => {},
}) => {
  const initialIdx = getInitialTabIdx();
  const [selectedTabIdx, setSelectedTabIdx] = useState(initialIdx);

  const getTabClickHandler = (idx) => () => {
    setSelectedTabIdx(idx);
  };

  const selectedTab = items[selectedTabIdx];

  useEffect(() => {
    onTabChange(selectedTab);
  }, [selectedTabIdx]);

  return { getTabClickHandler, selectedTabIdx, selectedTab, items };
};

export default useTab;
