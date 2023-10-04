import AuthContainer from "@/components/AuthContainer";
import Button from "@/components/Button";
import TextInput from "@/components/TextInput";
import {
  ArrowRightIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";

const Login = () => {
  return (
    <AuthContainer
      contentContainerClassName="flex flex-col gap-[2rem]"
      title="Log in"
    >
      <div className="flex flex-col gap-[1rem]">
        <TextInput
          id="username"
          name="username"
          placeholder="Enter Username"
          label="Username"
          required
        />
        <TextInput
          id="password"
          name="password"
          placeholder="Enter Password"
          label="Password"
          required
          secure
        />
      </div>
      <Button
        text="Log in"
        leftIcon={<ArrowRightOnRectangleIcon height={16} />}
      />
      <div className="flex flex-col gap-[1rem]">
        <p className="text-sm text-blue-700 select-none">
          Don't have an account?
        </p>
        <Button
          text="Sign up now"
          rightIcon={<ArrowRightIcon height={16} />}
          variant="secondary"
        />
      </div>
    </AuthContainer>
  );
};

export default Login;
