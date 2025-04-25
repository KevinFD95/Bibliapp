import Svg, { Path } from "react-native-svg";

import { useContext } from "react";
import { ThemeContext } from "../../src/context/ThemeContext.jsx";

const BookmarkIcon = ({ size, filled }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      height={size}
      width={size}
      viewBox="0 -960 960 960"
    >
      <Path
        d="M200-120v-640q0-33 23.5-56.5T280-840h400q33 0 56.5 23.5T760-760v640L480-240 200-120Z"
        fill={filled ? theme["selected-icons"] : "none"}
        stroke={filled ? theme["selected-icons"] : theme["unselected-icons"]}
        strokeWidth={60}
      />
    </Svg>
  );
};

export default BookmarkIcon;
