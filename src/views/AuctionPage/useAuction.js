import useRequestStatus from "@/hooks/useRequestStatus";
import useSignalEffect from "@/hooks/useSignalEffect";
import useAuth from "@/redux/auth/useAuth";
import api from "@/services/api";
import { useFormik } from "formik";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";

const useAuction = () => {
  const params = useParams();
  const status = useRequestStatus();
  const bidStatus = useRequestStatus();
  const topBidsStatus = useRequestStatus();
  const moreAuctionsStatus = useRequestStatus();
  const auth = useAuth();

  const auctionId = params.id;

  const get = (id = 0, signal) => {
    status.handlers.reset();
    status.handlers.setLoading(true);
    api.auctions
      .getById(id, signal)
      .then((res) => {
        const { data } = res;
        status.handlers.setData(data);
        getTopBids(id);
        getMoreAuctions(data.creator.id);
      })
      .catch(() => {
        status.handlers.setError("Error");
      })
      .finally(() => {
        status.handlers.setLoading(false);
      });
  };

  const getTopBids = (id = 0) => {
    topBidsStatus.handlers.reset();
    topBidsStatus.handlers.setLoading(true);
    api.auctions
      .getTopBidsById(id)
      .then((res) => {
        api.handleError(res);
        const { data } = res;
        topBidsStatus.handlers.setData(data);
        topBidsStatus.handlers.setLoading(false);
      })
      .catch((err) => {
        if (!api.isAborted(err)) {
          const message = api.getErrorMessage(err);
          topBidsStatus.handlers.setError(message);
          topBidsStatus.handlers.setLoading(false);
        }
      });
  };

  const getMoreAuctions = (creatorId = 0) => {
    moreAuctionsStatus.handlers.reset();
    moreAuctionsStatus.handlers.setLoading(true);
    api.auctions
      .getAvailable({ creatorId, pageSize: 5, exclude: auctionId })
      .then((res) => {
        const { data } = res;
        moreAuctionsStatus.setData(data);
      })
      .catch(() => {
        moreAuctionsStatus.handlers.setError("Error");
      })
      .finally(() => {
        moreAuctionsStatus.handlers.setLoading(false);
      });
  };

  useSignalEffect(
    (signal) => {
      get(auctionId, signal);
      // eslint-disable-next-line
    },
    [auctionId]
  );

  const placeBid = (bidAmount = 0) => {
    bidStatus.handlers.reset();
    bidStatus.handlers.setLoading(true);
    api.auctions
      .placeBidById(auctionId, bidAmount)
      .then(() => {
        toast.success("Bid placed succesfully");
      })
      .catch(() => {
        toast.error("Error placing bid");
      })
      .finally(() => {
        bidStatus.handlers.setLoading(false);
        get(auctionId);
      });
  };

  const rebid = (bidAmount = 0) => {
    bidStatus.handlers.reset();
    bidStatus.handlers.setLoading(true);
    api.auctions
      .rebidById(status.data?.current_user_bid?.id, bidAmount)
      .then(() => {
        toast.success("Rebid succesfully");
      })
      .catch(() => {
        toast.error("Error rebidding");
      })
      .finally(() => {
        bidStatus.handlers.setLoading(false);
        get(auctionId);
      });
  };

  const placeBidForm = useFormik({
    initialValues: {
      bidAmount: "",
    },
    validationSchema: Yup.object().shape({
      bidAmount: Yup.number().required().min(status.state.data?.base_price),
    }),
    validateOnBlur: true,
    validateOnChange: false,
    onSubmit: (values) => {
      const { bidAmount } = values;
      if (status.data?.current_user_bid) {
        rebid(bidAmount);
      } else {
        placeBid(bidAmount);
      }
    },
  });

  return {
    status: status.state,
    bid: {
      status: bidStatus.state,
      form: placeBidForm,
      canBid: auth.state.success,
    },
    topBids: { status: topBidsStatus.state },
    moreAuctions: { status: moreAuctionsStatus.state },
  };
};

export default useAuction;
