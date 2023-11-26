import useQuery from "@/hooks/useQuery";
import useRequestStatus from "@/hooks/useRequestStatus";
import useSignalEffect from "@/hooks/useSignalEffect";
import api from "@/services/api";

const useUsers = () => {
  const usersStatus = useRequestStatus();
  const query = useQuery();

  const search = query.get("search") || "";
  const page = query.get("page") || 1;

  const get = ({ search = "", pageSize = 10, page = 1 }, signal) => {
    usersStatus.handlers.reset();
    usersStatus.handlers.setLoading(true);
    api.users
      .get({ search, pageSize, page }, signal)
      .then((res) => {
        api.handleError(res);
        const data = res.data;
        usersStatus.handlers.setData(data);
        usersStatus.handlers.setLoading(false);
      })
      .catch((err) => {
        if (!api.isAborted(err)) {
          const message = api.getErrorMessage(err);
          usersStatus.handlers.setError(message);
          usersStatus.handlers.setLoading(false);
        }
      });
  };

  useSignalEffect(
    (signal) => {
      get({ search, page, pageSize: 15 }, signal);
    },
    [search, page]
  );

  const noResults =
    !usersStatus.state.loading && !usersStatus.state.data?.results?.length;

  return { status: usersStatus.state, noResults };
};

export default useUsers;
