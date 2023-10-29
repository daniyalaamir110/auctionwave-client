import { useEffect, useMemo, useState } from "react";

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

  console.log(selectedTabIdx);

  return useMemo(
    () => ({ getTabClickHandler, selectedTabIdx, selectedTab, items }),
    [items, selectedTabIdx]
  );
};

export default useTab;
