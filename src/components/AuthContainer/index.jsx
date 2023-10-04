import AppLogoWithTitleSrc from "@/assets/images/app-logo-with-title.png";

const AuthContainer = ({
  children,
  title = "",
  contentContainerClassName = "",
}) => {
  return (
    <div className="w-screen min-h-screen flex flex-row items-center justify-center bg-blue-50 md:p-[3rem]">
      <div className="max-w-[32rem] w-full md:p-[3rem] p-[2rem] flex flex-col gap-[3rem] items-center bg-white shadow-md">
        <img
          src={AppLogoWithTitleSrc}
          alt="app-logo-with-title"
          className="w-[12rem] select-none"
        />
        <h2 className="text-2xl text-black select-none">{title}</h2>
        <div className={`w-full ${contentContainerClassName}`}>{children}</div>
      </div>
    </div>
  );
};

export default AuthContainer;
