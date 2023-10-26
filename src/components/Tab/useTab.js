import { useMemo, useState } from "react";

const useTab = ({ items }) => {
  const [selectedTabIdx, setSelectedTabIdx] = useState(0);

  const getTabClickHandler = (idx) => () => {
    setSelectedTabIdx(idx);
  };

  const selectedTab = items[selectedTabIdx];

  return useMemo(
    () => ({ getTabClickHandler, selectedTabIdx, selectedTab, items }),
    [items]
  );
};

export default useTab;
