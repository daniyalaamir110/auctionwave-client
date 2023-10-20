import Button from "@/components/Button";
import ErrorLayout from "@/components/ErrorLayout";
import { HomeIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

const Page404 = () => {
  const navigate = useNavigate();

  return (
    <ErrorLayout>
      <div className="flex flex-col items-center gap-[1rem]">
        <h1 className="text-4xl font-bold text-blue-700">404 Not Found</h1>
        <p className="text-xl text-neutral-600">
          The requested page could not be served.
        </p>
        <Button
          large
          text="Back to Home Page"
          variant="secondary"
          leftIcon={<HomeIcon width={16} />}
          onClick={() => {
            navigate("/");
          }}
        />
      </div>
    </ErrorLayout>
  );
};

export default Page404;
