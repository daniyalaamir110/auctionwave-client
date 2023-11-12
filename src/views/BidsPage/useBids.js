import useQuery from "@/hooks/useQuery";
import useRequestStatus from "@/hooks/useRequestStatus";
import useSignalEffect from "@/hooks/useSignalEffect";
import api from "@/services/api";

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
          const { data } = res;
          bidsStatus.handlers.setData(data);
        })
        .catch((err) => {
          bidsStatus.handlers.setError("Something went wrong");
        })
        .finally(() => {
          bidsStatus.handlers.setLoading(false);
        });
    },
    [page, status]
  );

  return { status: bidsStatus.state };
};

export default useBids;
