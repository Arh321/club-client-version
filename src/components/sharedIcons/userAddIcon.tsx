import { IconsProps } from "./icons-index";

const UserAddIcon: React.FC<IconsProps> = ({
  height,
  width,
  isFill,
  ...props
}) => {
  return !isFill ? (
    <svg
      width={width}
      height={height}
      viewBox="0 0 26 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <ellipse
        cx="13"
        cy="8.66666"
        rx="4.33333"
        ry="4.33333"
        stroke="currentColor"
        strokeLinecap="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.018 17.0043C13.9732 16.825 12.8905 16.7856 11.8197 16.8914C10.0484 17.0662 8.37431 17.6319 7.01094 18.5286C5.64746 19.4254 4.64395 20.6221 4.15782 21.9828C4.06492 22.2428 4.20041 22.529 4.46046 22.6219C4.7205 22.7148 5.00662 22.5793 5.09953 22.3192C5.50069 21.1964 6.34648 20.1626 7.56046 19.3641C8.77455 18.5656 10.2903 18.0472 11.9179 17.8865C12.3782 17.8411 12.8404 17.8249 13.2997 17.8374C13.7268 17.3581 14.3356 17.0444 15.018 17.0043Z"
        fill="currentColor"
      />
      <path
        d="M19.5 15.1667L19.5 23.8333"
        stroke="currentColor"
        strokeLinecap="round"
      />
      <path
        d="M23.8334 19.5L15.1667 19.5"
        stroke="currentColor"
        strokeLinecap="round"
      />
    </svg>
  ) : (
    <svg
      width={width}
      height={height}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <ellipse
        cx="16"
        cy="10.6667"
        rx="5.33333"
        ry="5.33333"
        fill="white"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.4193 21C18.5498 20.4129 16.5124 20.2089 14.5095 20.4066C12.2743 20.6273 10.1529 21.3417 8.41747 22.4831C6.68184 23.6247 5.38609 25.1602 4.7551 26.9264C4.56929 27.4464 4.84028 28.0187 5.36037 28.2045C5.88046 28.3903 6.4527 28.1193 6.63851 27.5992C7.09957 26.3087 8.07988 25.099 9.51651 24.1541C10.9534 23.209 12.7579 22.5893 14.706 22.3969C15.1941 22.3488 15.6838 22.3281 16.1711 22.3344C16.7092 21.5298 17.6261 21 18.6667 21L20.4193 21Z"
        fill="currentColor"
      />
      <path
        d="M24 18.6667L24 29.3333"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M29.3334 24L18.6667 24"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default UserAddIcon;
