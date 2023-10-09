import { useState } from "react";

const useAccountPopover = () => {
  const [shown, setShown] = useState(false);

  const toggle = () => setShown((shown) => !shown);

  const show = () => setShown(true);

  const hide = () => setShown(false);

  return { shown, toggle, show, hide };
};

export default useAccountPopover;
