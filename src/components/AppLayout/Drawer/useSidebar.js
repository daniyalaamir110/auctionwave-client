import { useState } from "react";

const useSidebar = () => {
  const [shown, setShown] = useState(false);

  const show = () => setShown(true);

  const hide = () => setShown(false);

  return { shown, show, hide };
};

export default useSidebar;
