import Button from "@/components/Button";
import TextInput from "@/components/TextInput";
import { CheckIcon, PencilIcon } from "@heroicons/react/24/outline";
import useSettings from "./useSettings";
import Avatar from "@/components/Avatar";

const SettingsPage = () => {
  const settings = useSettings();

  return (
    <div className="flex flex-col gap-[2rem]">
      <h1 className="sm:text-4xl text-3xl">Account Settings</h1>
      <div className="flex xl:flex-row flex-col-reverse gap-[4rem]">
        <div className="flex flex-col gap-[1rem] max-w-[36rem] w-full">
          <h2 className="sm:text-3xl text-2xl my-[1rem]">General</h2>
          <div className="flex flex-row gap-[1rem] items-center">
            <TextInput
              label="First name"
              placeholder="Enter first name"
              required
              name="firstName"
              id="firstName"
              disabled={settings.status.loading}
              value={settings.forms.general.values.firstName}
              touched={settings.forms.general.touched.firstName}
              error={settings.forms.general.errors.firstName}
              onChange={settings.forms.general.handleChange("firstName")}
              onBlur={settings.forms.general.handleBlur("firstName")}
            />
            <TextInput
              label="Last name"
              placeholder="Enter last name"
              required
              name="lastName"
              id="lastName"
              disabled={settings.status.loading}
              value={settings.forms.general.values.lastName}
              touched={settings.forms.general.touched.lastName}
              error={settings.forms.general.errors.lastName}
              onChange={settings.forms.general.handleChange("lastName")}
              onBlur={settings.forms.general.handleBlur("lastName")}
            />
          </div>
          <TextInput
            label="Username"
            placeholder="Enter username"
            required
            name="username"
            id="username"
            disabled={settings.status.loading}
            value={settings.forms.general.values.username}
            touched={settings.forms.general.touched.username}
            error={settings.forms.general.errors.username}
            onChange={settings.forms.general.handleChange("username")}
            onBlur={settings.forms.general.handleBlur("username")}
          />
          <TextInput
            label="Email"
            placeholder="Enter email"
            required
            name="email"
            id="email"
            isEmail
            disabled={settings.status.loading}
            value={settings.forms.general.values.email}
            touched={settings.forms.general.touched.email}
            error={settings.forms.general.errors.email}
            onChange={settings.forms.general.handleChange("email")}
            onBlur={settings.forms.general.handleBlur("email")}
          />
          <div>
            <Button text="Save changes" leftIcon={<CheckIcon width={16} />} />
          </div>
          <h2 className="sm:text-3xl text-2xl my-[1rem]">Password</h2>
          <TextInput
            label="New password"
            placeholder="Enter new password"
            required
            name="password"
            id="password"
            disabled={settings.status.loading}
            value={settings.forms.changePassword.values.password}
            touched={settings.forms.changePassword.touched.password}
            error={settings.forms.changePassword.errors.password}
            onChange={settings.forms.changePassword.handleChange("password")}
            onBlur={settings.forms.changePassword.handleBlur("password")}
            secure
          />
          <TextInput
            label="Confirm new password"
            placeholder="Confirm new password"
            required
            name="confirmPassword"
            id="confirmPassword"
            disabled={settings.status.loading}
            value={settings.forms.changePassword.values.confirmPassword}
            touched={settings.forms.changePassword.touched.confirmPassword}
            error={settings.forms.changePassword.errors.confirmPassword}
            onChange={settings.forms.changePassword.handleChange(
              "confirmPassword"
            )}
            onBlur={settings.forms.changePassword.handleBlur("confirmPassword")}
            secure
          />
          <div>
            <Button
              text="Update password"
              leftIcon={<CheckIcon width={16} />}
            />
          </div>
        </div>
        <div className="flex flex-col gap-[1rem] max-w-[36rem] items-center">
          <h2 className="sm:text-3xl text-2xl my-[1rem] self-start">
            Profile Photo
          </h2>
          <Avatar large />
          <Button text="Edit" leftIcon={<PencilIcon width={16} />} />
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
