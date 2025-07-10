import { IconsProps } from "./icons-index";

const LevelsBAckGroundIcon: React.FC<IconsProps> = ({
  width = "298",
  height = "298",
  isFill,
  ...props
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 298 298"
      fill="none"
      {...props}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M293 297.5C290.515 297.5 288.5 295.485 288.5 293L288.5 286.949L297.5 286.949L297.5 293C297.5 295.485 295.485 297.5 293 297.5Z"
        stroke="currentColor"
      />
      <path
        d="M5 297.5C2.51472 297.5 0.5 295.485 0.5 293L0.499999 286.949L9.5 286.949L9.5 293C9.5 295.485 7.48528 297.5 5 297.5Z"
        stroke="currentColor"
      />
      <path
        d="M149 0.5C226.044 0.5 288.5 62.9563 288.5 140V287.104H9.5V140C9.50004 62.9563 71.9563 0.5 149 0.5Z"
        stroke="currentColor"
      />
    </svg>
  );
};

export default LevelsBAckGroundIcon;
