import Button from "@/components/Button";
import FileInput from "@/components/FileInput";
import TextInput from "@/components/TextInput";
import { CheckIcon } from "@heroicons/react/24/outline";
import useCreateAuction from "./useCreateAuction";

const CreateAuction = () => {
  const createAuction = useCreateAuction();

  console.log(createAuction.form.values);

  return (
    <div className="flex flex-col gap-[2rem]">
      <h1 className="text-4xl">Create Auction</h1>
      <div className="flex flex-col gap-[1rem] max-w-[36rem] w-full">
        <TextInput label="Search category" placeholder="Enter category name" />
        <div className="flex flex-row gap-[0.5rem] flex-wrap">
          {[
            "Car",
            "Mobile",
            "TV",
            "Furniture",
            "Art",
            "PCs/Laptops",
            "Cutlery",
            "Kitchenware",
            "Phones",
            "Gadgets",
          ].map((c, idx) => {
            const selected = idx === createAuction.form.values.category;
            return (
              <button
                key={idx}
                disabled={selected}
                className={`px-[0.5rem] py-[0.25rem] rounded-lg transition-all ${
                  selected
                    ? "bg-blue-700 text-white"
                    : "bg-blue-100 text-blue-900 hover:bg-blue-200 active:bg-blue-300"
                }`}
                onClick={() => createAuction.form.setFieldValue("category", 1)}
              >
                {c}
              </button>
            );
          })}
        </div>
        <TextInput
          label="Auction title"
          placeholder="Enter auction title"
          required
          name="title"
          id="title"
          value={createAuction.form.values.title}
          touched={createAuction.form.touched.title}
          error={createAuction.form.errors.title}
          onChange={createAuction.form.handleChange("title")}
          onBlur={createAuction.form.handleBlur("title")}
        />
        <TextInput
          label="Auction description"
          placeholder="Enter auction description"
          required
          multiline
          numberOfLines={4}
          name="description"
          id="description"
          value={createAuction.form.values.description}
          touched={createAuction.form.touched.description}
          error={createAuction.form.errors.description}
          onChange={createAuction.form.handleChange("description")}
          onBlur={createAuction.form.handleBlur("description")}
        />
        <TextInput
          label="Base price"
          placeholder="Enter base price"
          required
          helperText="Provide the bid amount for your auction that must be offered minimum by each bidder."
          isNumber
          name="basePrice"
          id="basePrice"
          value={createAuction.form.values.basePrice}
          touched={createAuction.form.touched.basePrice}
          error={createAuction.form.errors.basePrice}
          onChange={createAuction.form.handleChange("basePrice")}
          onBlur={createAuction.form.handleBlur("basePrice")}
        />
        {/* <RichTextEditor
          label="Additional Details"
          placeholder="Enter additional details."
          helperText="Put some additional details about your action item here."
          name="details"
          id="details"
          value={createAuction.form.values.details}
          touched={createAuction.form.touched.details}
          error={createAuction.form.errors.details}
                    onChange={createAuction.form.handleChange("details")}
          onBlur={createAuction.form.handleBlur("details")}
        /> */}
        <FileInput
          label="Display image"
          helperText="Provide a suitable image for your auction item to display"
          required
          name="image"
          id="image"
          value={createAuction.form.values.image}
          touched={createAuction.form.touched.image}
          error={createAuction.form.errors.image}
          onChange={(event) => {
            createAuction.form.setFieldValue(
              "image",
              event.currentTarget.files[0]
            );
          }}
        />
        <Button
          text="Done"
          leftIcon={<CheckIcon width={16} />}
          onClick={createAuction.form.handleSubmit}
        />
      </div>
    </div>
  );
};

export default CreateAuction;
