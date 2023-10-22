const TimeLeft = ({ value = 45, text = "" }) => {
  return (
    <div className="w-full max-w-[180rem] flex flex-col gap-[0.25rem] items-end">
      <div className="w-full bg-blue-200 rounded-full overflow-hidden">
        <div
          className={`bg-blue-700 p-[0.125rem]`}
          style={{ width: `${value}%` }}
        />
      </div>
      <p className="text-[0.625rem] text-neutral-600 uppercase">Ends {text}</p>
    </div>
  );
};

export default TimeLeft;
