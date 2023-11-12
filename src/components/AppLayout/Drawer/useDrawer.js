import { useState } from "react";

const useDrawer = () => {
  const [shown, setShown] = useState(false);

  const show = () => setShown(true);

  const hide = () => setShown(false);

  return { shown, show, hide };
};

export default useDrawer;
