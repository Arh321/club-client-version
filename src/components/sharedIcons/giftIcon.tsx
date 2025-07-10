import { IconsProps } from "./icons-index";

const GiftIcon: React.FC<IconsProps> = ({ color, height, width, ...props }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 62 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M1 9.05C1 6.20255 1 4.77882 1.56293 3.69513C2.03731 2.78191 2.78191 2.03731 3.69513 1.56293C4.77882 1 6.20255 1 9.05 1H52.95C55.7975 1 57.2212 1 58.3049 1.56293C59.2181 2.03731 59.9627 2.78191 60.4371 3.69513C61 4.77882 61 6.20255 61 9.05V30.95C61 33.7975 61 35.2212 60.4371 36.3049C59.9627 37.2181 59.2181 37.9627 58.3049 38.4371C57.2212 39 55.7975 39 52.95 39H9.05C6.20255 39 4.77882 39 3.69513 38.4371C2.78191 37.9627 2.03731 37.2181 1.56293 36.3049C1 35.2212 1 33.7975 1 30.95V9.05Z"
        stroke={"currentColor"}
        strokeWidth="2"
      />
      <path
        d="M1 12.1758L61 12.1758"
        stroke={"currentColor"}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M12.111 27.8242L27.6665 27.8242"
        stroke={"currentColor"}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default GiftIcon;
