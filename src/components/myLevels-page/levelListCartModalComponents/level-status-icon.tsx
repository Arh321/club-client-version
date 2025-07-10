import { Icon } from "@iconify/react/dist/iconify.js";

// Extracted component for status icon
const LevelStatusIcon: React.FC<{ status: string }> = ({ status }) => {
  if (status === "Done") {
    return (
      <span className="w-max ">
        <Icon
          icon="simple-line-icons:check"
          width="24"
          height="24"
          style={{ color: "var(--Secondary2)" }}
        />
      </span>
    );
  }
  if (status === "Next") {
    return (
      <span className="w-max ">
        <Icon
          icon="lets-icons:lock-light"
          width="28"
          height="28"
          style={{ color: "var(--Alert)" }}
        />
      </span>
    );
  }
  return null;
};

export default LevelStatusIcon;
