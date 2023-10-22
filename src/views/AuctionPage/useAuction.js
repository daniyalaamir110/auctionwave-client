import useRequestStatus from "@/hooks/useRequestStatus";
import api from "@/services/api";
import { useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";

const useAuction = () => {
  const params = useParams();
  const status = useRequestStatus();

  const auctionId = params.id;

  const get = useCallback(
    (id = 0) => {
      status.reset();
      status.setLoading(true);
      api.auctions
        .getById(id)
        .then((res) => {
          const { data } = res;
          status.setData(data);
        })
        .catch(() => {
          status.setError("Error");
        })
        .finally(() => {
          status.setLoading(false);
        });
    },
    [status]
  );

  useEffect(() => {
    get(auctionId);
  }, [auctionId]);

  return { status };
};

export default useAuction;
