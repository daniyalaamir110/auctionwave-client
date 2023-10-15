import Button from "@/components/Button";
import FileInput from "@/components/FileInput";
import RichTextEditor from "@/components/RichTextEditor";
import TextInput from "@/components/TextInput";
import { CheckIcon } from "@heroicons/react/24/outline";

const CreateAuction = () => {
  return (
    <div className="flex flex-col gap-[2rem]">
      <h1 className="text-4xl">Create Auction</h1>
      <div className="flex flex-col gap-[1rem] max-w-[36rem] w-full">
        <TextInput
          label="Auction title"
          placeholder="Enter auction title"
          required
        />
        <TextInput
          label="Auction description"
          placeholder="Enter auction description"
          required
          multiline
          numberOfLines={4}
        />
        <TextInput
          label="Base price"
          placeholder="Enter base price"
          required
          helperText="Provide the bid amount for your auction that must be offered minimum by each bidder."
          isNumber
        />
        <RichTextEditor
          label="Additional Details"
          id="additionalDetails"
          placeholder="Enter additional details."
          helperText="Put some additional details about your action item here."
        />
        <FileInput
          label="Display image"
          helperText="Provide a suitable image for your auction item to display"
          required
        />
        <Button text="Done" leftIcon={<CheckIcon width={16} />} />
      </div>
    </div>
  );
};

export default CreateAuction;
