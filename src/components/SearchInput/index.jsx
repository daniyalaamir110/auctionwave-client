import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const SearchInput = ({
  id = "",
  name = "",
  placeholder = "",
  loading = false,
  value = "",
  onChange = () => {},
  onBlur = () => {},
}) => {
  return (
    <div className="relative">
      <input
        id={id}
        name={name}
        className="pl-[2rem] border-[1px] rounded-md text-neutral-900 text-sm outline-transparent focus:outline-blue-700 block w-full p-2.5 placeholder:text-neutral-400 placeholder:select-none transition-all disabled:bg-neutral-100 border-neutral-500"
        placeholder={placeholder}
        disabled={loading}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        autoComplete="off"
      />
      <label htmlFor={id} className="text-blue-700">
        <MagnifyingGlassIcon
          width={16}
          className="absolute top-[50%] -translate-y-[50%] left-[0.5rem]"
        />
      </label>
    </div>
  );
};

export default SearchInput;
