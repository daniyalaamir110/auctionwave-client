import { useState, useCallback, useMemo } from "react";

const useAccountPopover = () => {
  const [shown, setShown] = useState(false);

  const toggle = useCallback(() => setShown((shown) => !shown), []);

  const show = useCallback(() => setShown(true), []);

  const hide = useCallback(() => setShown(false), []);

  return useMemo(
    () => ({ shown, toggle, show, hide }),
    [shown, toggle, show, hide]
  );
};

export default useAccountPopover;
