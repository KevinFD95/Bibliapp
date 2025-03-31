import Svg, { Path } from "react-native-svg";

import color from "../../src/config/colors.json";

const BookmarkIcon = ({ size, filled }) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      height={size}
      width={size}
      viewBox="0 -960 960 960"
    >
      <Path
        d="M200-120v-640q0-33 23.5-56.5T280-840h400q33 0 56.5 23.5T760-760v640L480-240 200-120Z"
        fill={filled ? color.icons["selected-icons"] : "none"}
        stroke={
          filled
            ? color.icons["selected-icons"]
            : color.icons["unselected-icons"]
        }
        strokeWidth={60}
      />
    </Svg>
  );
};

export default BookmarkIcon;
