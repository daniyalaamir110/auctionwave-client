import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import LoadingSpinner from "../LoadingSpinner";
import Button from "../Button";

const SearchInput = ({
  id = "",
  name = "",
  placeholder = "",
  loading = false,
  value = "",
  onChange = () => {},
  onBlur = () => {},
  onSubmit = () => {},
}) => {
  return (
    <div className="relative flex flex-row gap-[0.5rem] w-full">
      <input
        id={id}
        name={name}
        className="flex-1 pl-[2rem] border-[1px] rounded-md text-neutral-900 text-sm outline-transparent focus:outline-blue-700 block w-full p-2.5 placeholder:text-neutral-400 placeholder:select-none transition-all disabled:bg-neutral-100 border-neutral-500"
        placeholder={placeholder}
        disabled={loading}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        autoComplete="off"
      />
      <Button
        leftIcon={<MagnifyingGlassIcon width={16} />}
        loading={loading}
        onClick={onSubmit}
      />
      <label
        htmlFor={id}
        className="text-blue-700 absolute top-[50%] -translate-y-[50%] left-[0.5rem]"
      >
        <MagnifyingGlassIcon width={16} />
      </label>
    </div>
  );
};

export default SearchInput;
