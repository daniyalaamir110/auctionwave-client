import { useState, useCallback, useMemo } from "react";

const useModal = () => {
  const [shown, setShown] = useState(false);

  const show = useCallback(() => setShown(true), []);
  const hide = useCallback(() => setShown(false), []);

  return useMemo(() => ({ shown, show, hide }), [shown, show, hide]);
};

export default useModal;
