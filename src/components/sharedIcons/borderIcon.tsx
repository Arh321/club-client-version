import { IconsProps } from "./icons-index";

const ProfileFirstViewLeftBorder: React.FC<IconsProps> = ({
  height,
  width,
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 23 102"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 11H22V6C22 3.23858 19.7614 1 17 1C14.2386 1 12 3.23858 12 6V11ZM12 11H-1V91H12M12 11V91M12 91H22V96C22 98.7614 19.7614 101 17 101C14.2386 101 12 98.7614 12 96V91Z"
        stroke="var(--cta)"
      />
    </svg>
  );
};

const ProfileFirstViewRightBorder: React.FC<IconsProps> = ({
  height,
  width,
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 23 102"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11 11H1V6C1 3.23858 3.23858 1 6 1C8.76142 1 11 3.23858 11 6V11ZM11 11H24V91H11M11 11V91M11 91H1V96C1 98.7614 3.23858 101 6 101C8.76142 101 11 98.7614 11 96V91Z"
        stroke="var(--cta)"
      />
    </svg>
  );
};

export { ProfileFirstViewLeftBorder, ProfileFirstViewRightBorder };
