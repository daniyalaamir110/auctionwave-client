import AuthContainer from "@/components/AuthContainer";
import Button from "@/components/Button";
import TextInput from "@/components/TextInput";
import { ArrowRightIcon, UserPlusIcon } from "@heroicons/react/24/outline";

const Signup = () => {
  return (
    <AuthContainer
      contentContainerClassName="flex flex-col gap-[2rem]"
      title="Sign up"
    >
      <div className="flex flex-col gap-[1rem]">
        <div className="flex flex-row gap-[1rem] items-center justify-between">
          <TextInput
            id="firstName"
            name="firstName"
            placeholder="Enter first name"
            label="First Name"
            required
          />
          <TextInput
            id="lastName"
            name="lastName"
            placeholder="Enter last name"
            label="Last Name"
            required
          />
        </div>
        <TextInput
          id="email"
          name="email"
          placeholder="Enter Email"
          label="Email"
          required
          isEmail
          helperText="e.g. johndoe12@gmail.com"
        />
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
        <TextInput
          id="confirmPassword"
          name="confirmPassword"
          placeholder="Re-enter your password"
          label="Confirm password"
          required
          secure
        />
      </div>
      <Button text="Sign up" leftIcon={<UserPlusIcon height={16} />} />
      <div className="flex flex-col gap-[1rem]">
        <p className="text-sm text-blue-700 select-none">
          Already have an account?
        </p>
        <Button
          text="Log in now"
          rightIcon={<ArrowRightIcon height={16} />}
          variant="secondary"
        />
      </div>
    </AuthContainer>
  );
};

export default Signup;
