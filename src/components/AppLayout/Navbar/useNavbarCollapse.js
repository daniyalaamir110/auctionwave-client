import { useState, useCallback, useMemo } from "react";

const useNavbarCollapse = () => {
  const [collapsed, setCollapsed] = useState(true);

  const toggle = useCallback(() => setCollapsed((collapsed) => !collapsed), []);
  const hide = useCallback(() => setCollapsed(true), []);

  return useMemo(
    () => ({ collapsed, toggle, hide }),
    [collapsed, toggle, hide]
  );
};

export default useNavbarCollapse;
