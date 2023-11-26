import useRequestStatus from "@/hooks/useRequestStatus";
import api from "@/services/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const useSellAuction = () => {
  const sellStatus = useRequestStatus();
  const navigate = useNavigate();

  const sell = (id = 0) => {
    sellStatus.handlers.setLoading(true);
    api.auctions
      .sellById(id)
      .then((res) => {
        api.handleError(res);
        toast.success("Item marked as sold successfully");
        navigate("?status=sold");
        sellStatus.handlers.setLoading(false);
      })
      .catch((err) => {
        const message = api.getErrorMessage(err);
        toast.error(message);
        sellStatus.handlers.setLoading(false);
      });
  };

  return { status: sellStatus.state, sell };
};

export default useSellAuction;
