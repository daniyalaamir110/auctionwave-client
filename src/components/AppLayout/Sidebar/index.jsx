const Sidebar = ({ shown = false, hide = () => {} }) => {
  return (
    <div
      className={`fixed bg-black bg-opacity-50 w-screen h-screen top-0 transition-all ${
        !shown ? "bg-transparent -z-50" : ""
      }`}
      onClick={hide}
    >
      <div
        className={`bg-white w-[20rem] h-full transition-all ${
          !shown ? "-translate-x-full" : "shadow-md"
        }`}
      ></div>
    </div>
  );
};

export default Sidebar;
