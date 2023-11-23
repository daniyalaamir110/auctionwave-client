import useAuth from "@/redux/auth/useAuth";

const Welcome = () => {
  const auth = useAuth();

  return (
    <div className="flex flex-row items-center gap-[0.5rem]">
      <div className="animate-wave shrink-0 sm:text-4xl text-3xl">👋</div>
      <h1 className="sm:text-4xl text-3xl">
        Welcome {auth.state.user?.first_name}
      </h1>
    </div>
  );
};

export default Welcome;
