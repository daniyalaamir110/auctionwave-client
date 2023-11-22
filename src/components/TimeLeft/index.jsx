const TimeLeft = ({ value = 100, text = "" }) => {
  return (
    <div className="w-full max-w-[180rem] flex flex-col gap-[0.25rem] items-end">
      <div className="w-full bg-blue-200 rounded-full">
        <div
          className={`bg-blue-700 rounded-full p-[0.0625rem] relative`}
          style={{ width: `${value}%` }}
        >
          <div className="p-[0.25rem] rounded-full bg-blue-700 top-0 right-0 translate-x-[50%] translate-y-[-37.5%] absolute" />
        </div>
      </div>
      {text && (
        <p className="text-[0.625rem] text-neutral-600 uppercase">
          Ends {text}
        </p>
      )}
    </div>
  );
};

export default TimeLeft;
