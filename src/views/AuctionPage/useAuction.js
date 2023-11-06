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
    status.reset();
    status.setLoading(true);
    api.auctions
      .getById(id, signal)
      .then((res) => {
        const { data } = res;
        status.setData(data);
        getTopBids(id);
        getMoreAuctions(data.creator.id);
      })
      .catch(() => {
        status.setError("Error");
      })
      .finally(() => {
        status.setLoading(false);
      });
  };

  const getTopBids = (id = 0) => {
    topBidsStatus.reset();
    topBidsStatus.setLoading(true);
    api.auctions
      .getTopBidsById(id)
      .then((res) => {
        const { data } = res;
        topBidsStatus.setData(data);
      })
      .catch(() => {
        topBidsStatus.setError("Error");
      })
      .finally(() => {
        topBidsStatus.setLoading(false);
      });
  };

  const getMoreAuctions = (creatorId = 0) => {
    moreAuctionsStatus.reset();
    moreAuctionsStatus.setLoading(true);
    api.auctions
      .getAvailable({ creatorId, pageSize: 5, exclude: auctionId })
      .then((res) => {
        const { data } = res;
        moreAuctionsStatus.setData(data);
      })
      .catch(() => {
        moreAuctionsStatus.setError("Error");
      })
      .finally(() => {
        moreAuctionsStatus.setLoading(false);
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
    bidStatus.reset();
    bidStatus.setLoading(true);
    api.auctions
      .placeBidById(auctionId, bidAmount)
      .then(() => {
        toast.success("Bid placed succesfully");
      })
      .catch(() => {
        toast.error("Error placing bid");
      })
      .finally(() => {
        bidStatus.setLoading(false);
        get(auctionId);
      });
  };

  const rebid = (bidAmount = 0) => {
    bidStatus.reset();
    bidStatus.setLoading(true);
    api.auctions
      .rebidById(status.data?.current_user_bid?.id, bidAmount)
      .then(() => {
        toast.success("Rebid succesfully");
      })
      .catch(() => {
        toast.error("Error rebidding");
      })
      .finally(() => {
        bidStatus.setLoading(false);
        get(auctionId);
      });
  };

  const placeBidForm = useFormik({
    initialValues: {
      bidAmount: "",
    },
    validationSchema: Yup.object().shape({
      bidAmount: Yup.number().required().min(status.data?.base_price),
    }),
    validateOnBlur: true,
    validateOnChange: false,
    onSubmit: (values, helpers) => {
      const { bidAmount } = values;
      if (status.data?.current_user_bid) {
        rebid(bidAmount);
      } else {
        placeBid(bidAmount);
      }
    },
  });

  return {
    status,
    bid: {
      status: bidStatus,
      form: placeBidForm,
      canBid: auth.state.success,
    },
    topBids: { status: topBidsStatus },
    moreAuctions: { status: moreAuctionsStatus },
  };
};

export default useAuction;
