import useQuery from "@/hooks/useQuery";
import useRequestStatus from "@/hooks/useRequestStatus";
import useSignalEffect from "@/hooks/useSignalEffect";
import api from "@/services/api";
import { toast } from "react-toastify";

const useBids = () => {
  const bidsStatus = useRequestStatus();
  const query = useQuery();

  const page = query.get("page") || 1;
  const status = query.get("status") || "pending";

  useSignalEffect(
    (signal) => {
      bidsStatus.handlers.reset();
      bidsStatus.handlers.setLoading(true);
      api.bids
        .get({ bidsStatus: status, page, pageSize: 10 }, signal)
        .then((res) => {
          api.handleError(res);
          const { data } = res;
          bidsStatus.handlers.setData(data);
          bidsStatus.handlers.setLoading(false);
        })
        .catch((err) => {
          if (!api.isAborted(err)) {
            const message = api.getErrorMessage(err);
            bidsStatus.handlers.setError(message);
            bidsStatus.handlers.setLoading(false);
            toast(message);
          }
        });
    },
    [page, status]
  );

  return { status: bidsStatus.state };
};

export default useBids;
