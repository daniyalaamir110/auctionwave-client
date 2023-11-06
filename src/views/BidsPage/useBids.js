import useQuery from "@/hooks/useQuery";
import useRequestStatus from "@/hooks/useRequestStatus";
import useSignalEffect from "@/hooks/useSignalEffect";
import api from "@/services/api";

const useBids = () => {
  const status = useRequestStatus();
  const query = useQuery();

  const page = query.get("page") || 1;
  const _status = query.get("status") || "pending";

  useSignalEffect(
    (signal) => {
      status.reset();
      status.setLoading(true);
      api.bids
        .get({ status: _status, page, pageSize: 10 }, signal)
        .then((res) => {
          const { data } = res;
          status.setData(data);
        })
        .catch((err) => {
          status.setError("Something went wrong");
        })
        .finally(() => {
          status.setLoading(false);
        });
    },
    [page, _status]
  );

  return { status };
};

export default useBids;
