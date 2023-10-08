import AuthContainer from "@/components/AuthContainer";
import Button from "@/components/Button";
import TextInput from "@/components/TextInput";
import {
  ArrowRightIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import useLogin from "./useLogin";

const Login = () => {
  const navigate = useNavigate();

  const login = useLogin();

  return (
    <AuthContainer
      contentContainerClassName="flex flex-col gap-[2rem]"
      title="Log in"
    >
      <div className="flex flex-col gap-[1rem]">
        <TextInput
          id="username"
          value={login.form.values.username}
          onChange={login.form.handleChange("username")}
          onBlur={login.form.handleBlur("username")}
          error={login.form.errors.username}
          touched={login.form.touched.username}
          name="username"
          placeholder="Enter username"
          label="Username"
          required
        />
        <TextInput
          id="password"
          value={login.form.values.password}
          onChange={login.form.handleChange("password")}
          onBlur={login.form.handleBlur("password")}
          error={login.form.errors.password}
          touched={login.form.touched.password}
          name="password"
          placeholder="Enter password"
          label="Password"
          required
          secure
        />
      </div>
      <Button
        text="Log in"
        leftIcon={<ArrowRightOnRectangleIcon height={16} />}
        loading={login.requestStatus.loading}
        onClick={login.form.handleSubmit}
      />
      <div className="flex flex-col gap-[1rem]">
        <p className="text-sm text-blue-700 select-none">
          Don't have an account?
        </p>
        <Button
          text="Sign up now"
          rightIcon={<ArrowRightIcon height={16} />}
          variant="secondary"
          onClick={() => {
            navigate("/auth/signup");
          }}
        />
      </div>
    </AuthContainer>
  );
};

export default Login;
