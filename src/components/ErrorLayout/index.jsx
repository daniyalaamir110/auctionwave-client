import ErrorIllustrationSrc from "@/assets/images/error-illustration.svg";

const ErrorLayout = ({ children }) => {
  return (
    <div className="w-full h-full p-[1rem] flex flex-col justify-center items-center gap-[2rem]">
      <img
        src={ErrorIllustrationSrc}
        alt="error"
        className="w-full max-w-[32rem]"
      />
      <div>{children}</div>
    </div>
  );
};

export default ErrorLayout;
