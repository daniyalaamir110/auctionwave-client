import AuthContainer from "@/components/AuthContainer";
import Button from "@/components/Button";
import LoadingSpinner from "@/components/LoadingSpinner";
import TextInput from "@/components/TextInput";
import { ArrowRightIcon, UserPlusIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import useSignup from "./useSignup";

const Signup = () => {
  const navigate = useNavigate();

  const signup = useSignup();

  return (
    <AuthContainer
      contentContainerClassName="flex flex-col gap-[2rem]"
      title="Sign up"
    >
      <div className="flex flex-col gap-[1rem]">
        <div className="flex flex-row gap-[1rem] justify-between">
          <TextInput
            id="firstName"
            value={signup.form.values.firstName}
            onChange={signup.form.handleChange("firstName")}
            onBlur={signup.form.handleBlur("firstName")}
            error={signup.form.errors.firstName}
            touched={signup.form.touched.firstName}
            name="firstName"
            placeholder="Enter first name"
            label="First name"
            required
          />
          <TextInput
            id="lastName"
            value={signup.form.values.lastName}
            onChange={signup.form.handleChange("lastName")}
            onBlur={signup.form.handleBlur("lastName")}
            error={signup.form.errors.lastName}
            touched={signup.form.touched.lastName}
            name="lastName"
            placeholder="Enter last name"
            label="Last name"
            required
          />
        </div>
        <TextInput
          id="email"
          value={signup.form.values.email}
          onChange={signup.form.handleChange("email")}
          onBlur={signup.form.handleBlur("email")}
          error={signup.form.errors.email}
          touched={signup.form.touched.email}
          name="email"
          placeholder="Enter email"
          label="Email"
          required
          isEmail
          helperText="e.g. johndoe12@gmail.com"
        />
        <div className="flex flex-col gap-[0.5rem]">
          <TextInput
            id="username"
            value={signup.form.values.username}
            onChange={signup.form.handleChange("username")}
            onBlur={signup.form.handleBlur("username")}
            error={signup.form.errors.username}
            touched={signup.form.touched.username}
            name="username"
            placeholder="Enter username"
            label="Username"
            required
          />
          {signup.loadUsernames.requestStatus.loading ? (
            <div className="flex flex-row gap-[0.5rem] items-center text-blue-800">
              <p className="text-xs">Loading Suggestions</p>
              <LoadingSpinner />
            </div>
          ) : (
            <div className="flex flex-row gap-[0.5rem] items-center flex-wrap">
              {signup.loadUsernames.requestStatus.data?.map((username, idx) => (
                <div
                  key={idx}
                  className={`text-xs bg-blue-50 p-[0.5rem] rounded-lg text-blue-700 cursor-pointer hover:bg-blue-200 transition-all border-[0.75px] ${
                    signup.isUsername(username)
                      ? "border-blue-700 bg-blue-100"
                      : "border-transparent"
                  }`}
                  onClick={() => signup.selectUsername(username)}
                >
                  {username}
                </div>
              ))}
            </div>
          )}
        </div>
        <TextInput
          id="password"
          value={signup.form.values.password}
          onChange={signup.form.handleChange("password")}
          onBlur={signup.form.handleBlur("password")}
          error={signup.form.errors.password}
          touched={signup.form.touched.password}
          name="password"
          placeholder="Enter password"
          label="Password"
          required
          secure
          helperText="Password must be 8 to 20 characters long"
        />
        <TextInput
          id="confirmPassword"
          value={signup.form.values.confirmPassword}
          onChange={signup.form.handleChange("confirmPassword")}
          onBlur={signup.form.handleBlur("confirmPassword")}
          error={signup.form.errors.confirmPassword}
          touched={signup.form.touched.confirmPassword}
          name="confirmPassword"
          placeholder="Re-enter your password"
          label="Confirm password"
          required
          secure
        />
      </div>
      <Button
        text="Sign up"
        leftIcon={<UserPlusIcon height={16} />}
        loading={signup.requestStatus.loading}
        disabled={!signup.form.isValid}
        onClick={signup.form.handleSubmit}
      />
      <div className="flex flex-col gap-[1rem]">
        <p className="text-sm text-blue-700 select-none">
          Already have an account?
        </p>
        <Button
          text="Log in now"
          rightIcon={<ArrowRightIcon height={16} />}
          variant="secondary"
          onClick={() => {
            navigate("/auth/login");
          }}
        />
      </div>
    </AuthContainer>
  );
};

export default Signup;
