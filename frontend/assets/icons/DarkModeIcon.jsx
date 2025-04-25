import Svg, { Path } from "react-native-svg";

import { useContext } from "react";
import { ThemeContext } from "../../src/context/ThemeContext.jsx";

const DarkModeIcon = ({ size, filled }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <Svg height={size} width={size} viewBox="0 -960 960 960">
      <Path
        d="M480-120q-150 0-255-105T120-480q0-150 105-255t255-105q14 0 27.5 1t26.5 3q-41 29-65.5 75.5T444-660q0 90 63 153t153 63q55 0 101-24.5t75-65.5q2 13 3 26.5t1 27.5q0 150-105 255T480-120Z"
        fill={filled ? theme["selected-icons"] : theme["unselected-icons"]}
        stroke={filled ? theme["selected-icons"] : theme["unselected-icons"]}
        strokeWidth={60}
      />
    </Svg>
  );
};

export default DarkModeIcon;
