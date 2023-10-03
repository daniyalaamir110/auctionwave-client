const TextInput = ({
  id,
  name,
  placeholder,
  label,
  required = false,
  secure = false,
}) => {
  return (
    <div>
      <label
        for={id}
        className={`block mb-2 text-sm font-medium text-black ${
          required ? " required" : ""
        }`}
      >
        {label}
      </label>
      <input
        id={id}
        name={name}
        className="border border-blue-400 text-blue-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder:text-blue-400 transition-all"
        placeholder={placeholder}
        required={required}
        type={secure ? "password" : "text"}
      />
    </div>
  );
};

export default TextInput;
