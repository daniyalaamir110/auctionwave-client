import { useState } from "react";

const useNavbarCollapse = () => {
  const [collapsed, setCollapsed] = useState(true);

  const toggle = () => setCollapsed((collapsed) => !collapsed);
  const hide = () => setCollapsed(true);

  return { collapsed, toggle, hide };
};

export default useNavbarCollapse;
