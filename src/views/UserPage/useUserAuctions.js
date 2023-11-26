import useQuery from "@/hooks/useQuery";
import useRequestStatus from "@/hooks/useRequestStatus";
import useSignalEffect from "@/hooks/useSignalEffect";
import api from "@/services/api";
import { useParams } from "react-router-dom";

const useUserAuctions = () => {
  const auctionsStatus = useRequestStatus();
  const params = useParams();
  const userId = params.id;
  const query = useQuery();

  const page = query.get("page") || 1;

  const getAvailable = ({ pageSize = 10, page = 1 }, signal) => {
    auctionsStatus.handlers.reset();
    auctionsStatus.handlers.setLoading(true);
    api.auctions
      .getAvailable(
        {
          creator: userId,
          pageSize,
          page,
        },
        signal
      )
      .then((res) => {
        api.handleError(res);
        const data = res.data;
        auctionsStatus.handlers.setData(data);
        auctionsStatus.handlers.setLoading(false);
      })
      .catch((err) => {
        if (!api.isAborted(err)) {
          const message = api.getErrorMessage(err);
          auctionsStatus.handlers.setError(message);
          auctionsStatus.handlers.setLoading(false);
        }
      });
  };

  useSignalEffect(
    (signal) => {
      getAvailable({ page, pageSize: 12 }, signal);
    },
    [page]
  );

  const noResults =
    !auctionsStatus.state.loading &&
    !auctionsStatus.state.data?.results?.length;

  return { status: auctionsStatus.state, noResults };
};

export default useUserAuctions;
