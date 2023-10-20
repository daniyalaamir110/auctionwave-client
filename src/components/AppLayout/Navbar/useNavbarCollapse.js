import { useState } from "react";

const useNavbarCollapse = () => {
  const [collapsed, setCollapsed] = useState(true);

  const toggle = () => setCollapsed((collapsed) => !collapsed);

  return { collapsed, toggle };
};

export default useNavbarCollapse;
