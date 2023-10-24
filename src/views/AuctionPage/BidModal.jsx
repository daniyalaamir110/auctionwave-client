import Button from "@/components/Button";
import { default as Modal } from "@/components/Modal";
import TextInput from "@/components/TextInput";
import { ArrowDownOnSquareIcon } from "@heroicons/react/24/outline";

const BidModal = ({
  shown = false,
  hide = () => {},
  bidContext = null,
  currentUserBid = null,
}) => {
  return (
    <Modal
      shown={shown}
      hide={hide}
      title={!currentUserBid ? "Place Bid" : "Rebid"}
    >
      <div className="flex flex-col gap-[1rem]">
        <TextInput
          label="Bid amount"
          isNumber
          id="bidAmount"
          disabled={bidContext.status.loading}
          value={bidContext.form.values.bidAmount}
          onChange={bidContext.form.handleChange("bidAmount")}
          onBlur={bidContext.form.handleBlur("bidAmount")}
          error={bidContext.form.errors.bidAmount}
          touched={bidContext.form.touched.bidAmount}
          name="bidAmount"
          placeholder="Enter bid amount"
          required
        />
        <Button
          text="Place bid"
          onClick={() => bidContext.form.submitForm().finally(hide)}
          leftIcon={<ArrowDownOnSquareIcon width={16} />}
          loading={bidContext.status.loading}
        />
      </div>
    </Modal>
  );
};

export default BidModal;
