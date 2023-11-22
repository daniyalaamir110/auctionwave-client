import Avatar from "@/components/Avatar";
import Button from "@/components/Button";
import ImageInput from "@/components/ImageInput";
import LoadingItems from "@/components/LoadingItems";
import Modal from "@/components/Modal";
import useModal from "@/components/Modal/useModal";
import TextInput from "@/components/TextInput";
import useAuth from "@/redux/auth/useAuth";
import {
  CheckIcon,
  PencilSquareIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import useSettings from "./useSettings";

const EditContainer = ({
  children,
  status = null,
  setEditing = () => {},
  editing = false,
  label = "",
  defaultValue = "",
  onSubmit = () => {},
  onCancel = () => {},
}) => (
  <div className="flex flex-col gap-[0.5rem]">
    <label className="text-lg">{label}</label>
    {!editing ? (
      <div className="p-[1rem] rounded-lg border border-neutral-200 bg-neutral-50 flex flex-row justify-between gap-[1rem] items-center">
        <p className="text-neutral-600 text-sm">{defaultValue}</p>
        <div className="flex flex-row justify-start items-center gap-[1rem]">
          <Button
            text="Edit"
            variant="secondary"
            leftIcon={<PencilSquareIcon width={16} />}
            onClick={() => setEditing(true)}
          />
        </div>
      </div>
    ) : (
      <div className="p-[1rem] rounded-lg border border-neutral-200 flex flex-col gap-[1rem]">
        {children}
        <div className="flex flex-row justify-start items-center gap-[1rem]">
          <Button
            text="Save changes"
            leftIcon={<CheckIcon width={16} />}
            loading={status.loading}
            onClick={onSubmit}
          />
          <Button
            text="Cancel"
            variant="secondary"
            leftIcon={<XMarkIcon width={16} />}
            onClick={() => {
              setEditing(false);
              onCancel();
            }}
            disabled={status.loading}
          />
        </div>
      </div>
    )}
  </div>
);

const SettingsPage = () => {
  const settings = useSettings();
  const auth = useAuth();
  const profileImageModal = useModal();

  return (
    <div className="flex flex-col gap-[2rem]">
      <h1 className="sm:text-4xl text-3xl">Account Settings</h1>
      <div className="flex xl:flex-row flex-col-reverse gap-[4rem]">
        <div className="flex flex-col gap-[1rem] max-w-[36rem] w-full">
          <EditContainer
            label="Name"
            status={settings.forms.changeName.status}
            editing={settings.forms.changeName.editing}
            setEditing={settings.forms.changeName.setEditing}
            defaultValue={settings.forms.changeName.defaultValue}
            onSubmit={settings.forms.changeName.form.handleSubmit}
            onCancel={settings.forms.changeName.form.resetForm}
          >
            <div className="flex flex-row gap-[1rem] items-center">
              <TextInput
                label="First name"
                placeholder="Enter first name"
                required
                name="firstName"
                id="firstName"
                disabled={settings.forms.changeName.status.loading}
                value={settings.forms.changeName.form.values.firstName}
                touched={settings.forms.changeName.form.touched.firstName}
                error={settings.forms.changeName.form.errors.firstName}
                onChange={settings.forms.changeName.form.handleChange(
                  "firstName"
                )}
                onBlur={settings.forms.changeName.form.handleBlur("firstName")}
              />
              <TextInput
                label="Last name"
                placeholder="Enter last name"
                required
                name="lastName"
                id="lastName"
                disabled={settings.forms.changeName.status.loading}
                value={settings.forms.changeName.form.values.lastName}
                touched={settings.forms.changeName.form.touched.lastName}
                error={settings.forms.changeName.form.errors.lastName}
                onChange={settings.forms.changeName.form.handleChange(
                  "lastName"
                )}
                onBlur={settings.forms.changeName.form.handleBlur("lastName")}
              />
            </div>
          </EditContainer>
          <EditContainer
            label="Username"
            status={settings.forms.changeUsername.status}
            editing={settings.forms.changeUsername.editing}
            setEditing={settings.forms.changeUsername.setEditing}
            defaultValue={settings.forms.changeUsername.defaultValue}
            onSubmit={settings.forms.changeUsername.form.handleSubmit}
            onCancel={settings.forms.changeUsername.form.resetForm}
          >
            <TextInput
              label="Username"
              placeholder="Enter username"
              required
              name="username"
              id="username"
              disabled={settings.forms.changeUsername.status.loading}
              value={settings.forms.changeUsername.form.values.username}
              touched={settings.forms.changeUsername.form.touched.username}
              error={settings.forms.changeUsername.form.errors.username}
              onChange={settings.forms.changeUsername.form.handleChange(
                "username"
              )}
              loading={
                settings.forms.changeUsername.usernameAvailability.loading
              }
              onBlur={settings.forms.changeUsername.form.handleBlur("username")}
            />
            {settings.forms.changeUsername.suggestions.status.loading ? (
              <LoadingItems text="Loading suggestions" />
            ) : settings.forms.changeUsername.suggestions.status.error ? (
              <p className="text-xs">
                {settings.forms.changeUsername.suggestions.status.error}
              </p>
            ) : (
              <div className="flex flex-row gap-[0.5rem] items-center flex-wrap">
                {settings.forms.changeUsername.suggestions.status.data?.map(
                  (username, idx) => (
                    <div
                      key={idx}
                      className={`text-xs bg-blue-50 p-[0.5rem] rounded-lg text-blue-700 cursor-pointer hover:bg-blue-200 transition-all border-[1px] ${
                        settings.forms.changeUsername.suggestions.isSelected(
                          username
                        )
                          ? "border-blue-700 bg-blue-100"
                          : "border-transparent"
                      }`}
                      onClick={() =>
                        settings.forms.changeUsername.suggestions.select(
                          username
                        )
                      }
                    >
                      {username}
                    </div>
                  )
                )}
              </div>
            )}
          </EditContainer>
          <EditContainer
            label="Email"
            status={settings.forms.changeEmail.status}
            editing={settings.forms.changeEmail.editing}
            setEditing={settings.forms.changeEmail.setEditing}
            defaultValue={settings.forms.changeEmail.defaultValue}
            onSubmit={settings.forms.changeEmail.form.handleSubmit}
            onCancel={settings.forms.changeEmail.form.resetForm}
          >
            <TextInput
              label="Email"
              placeholder="Enter email"
              required
              name="email"
              id="email"
              isEmail
              disabled={settings.forms.changeEmail.status.loading}
              value={settings.forms.changeEmail.form.values.email}
              touched={settings.forms.changeEmail.form.touched.email}
              error={settings.forms.changeEmail.form.errors.email}
              onChange={settings.forms.changeEmail.form.handleChange("email")}
              onBlur={settings.forms.changeEmail.form.handleBlur("email")}
              loading={settings.forms.changeEmail.emailAvailability.loading}
            />
          </EditContainer>
          <EditContainer
            label="Password"
            status={settings.forms.changePassword.status}
            editing={settings.forms.changePassword.editing}
            setEditing={settings.forms.changePassword.setEditing}
            defaultValue={settings.forms.changePassword.defaultValue}
            onSubmit={settings.forms.changePassword.form.handleSubmit}
            onCancel={settings.forms.changePassword.form.resetForm}
          >
            <TextInput
              label="New password"
              placeholder="Enter new password"
              required
              name="password"
              id="password"
              disabled={settings.forms.changePassword.status.loading}
              value={settings.forms.changePassword.form.values.password}
              touched={settings.forms.changePassword.form.touched.password}
              error={settings.forms.changePassword.form.errors.password}
              onChange={settings.forms.changePassword.form.handleChange(
                "password"
              )}
              onBlur={settings.forms.changePassword.form.handleBlur("password")}
              secure
            />
            <TextInput
              label="Confirm new password"
              placeholder="Confirm new password"
              required
              name="confirmPassword"
              id="confirmPassword"
              disabled={settings.forms.changePassword.status.loading}
              value={settings.forms.changePassword.form.values.confirmPassword}
              touched={
                settings.forms.changePassword.form.touched.confirmPassword
              }
              error={settings.forms.changePassword.form.errors.confirmPassword}
              onChange={settings.forms.changePassword.form.handleChange(
                "confirmPassword"
              )}
              onBlur={settings.forms.changePassword.form.handleBlur(
                "confirmPassword"
              )}
              secure
            />
          </EditContainer>
        </div>
        <div className="flex flex-col gap-[1rem] max-w-[36rem] items-center">
          <h2 className="sm:text-3xl text-2xl my-[1rem] self-start">
            Profile Photo
          </h2>
          <Avatar src={auth.state.user?.profile_image} large />
          <div className="flex flex-row items-center gap-[1rem]">
            <Button
              text="Edit"
              leftIcon={<PencilSquareIcon width={16} />}
              onClick={profileImageModal.show}
            />
            {!!auth.state.user?.profile_image && (
              <Button
                text="Remove"
                leftIcon={<TrashIcon width={16} />}
                onClick={settings.forms.removeProfileImage.handler}
                loading={settings.forms.removeProfileImage.status.loading}
                variant="danger"
              />
            )}
          </div>
          <Modal
            shown={profileImageModal.shown}
            hide={() => {
              profileImageModal.hide();
              settings.forms.changeProfileImage.form.resetForm();
            }}
            title="Change profile image"
          >
            <div className="flex flex-col gap-[1rem] w-full">
              <ImageInput
                label="Profile image"
                helperText="Provide a clear and good image for your profile to display"
                required
                name="profileImage"
                id="profileImage"
                disabled={settings.forms.changeProfileImage.status.loading}
                value={
                  settings.forms.changeProfileImage.form.values.profileImage
                }
                touched={
                  settings.forms.changeProfileImage.form.touched.profileImage
                }
                error={
                  settings.forms.changeProfileImage.form.errors.profileImage
                }
                onChange={(event) => {
                  settings.forms.changeProfileImage.form.setFieldTouched(
                    "profileImage",
                    true
                  );
                  settings.forms.changeProfileImage.form.setFieldValue(
                    "profileImage",
                    event.currentTarget.files[0]
                  );
                }}
              />
              <Button
                text="Done"
                leftIcon={<CheckIcon width={16} />}
                onClick={settings.forms.changeProfileImage.form.handleSubmit}
                loading={settings.forms.changeProfileImage.status.loading}
              />
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
