import { useContext } from "react";
import Svg, { Path } from "react-native-svg";
import { ThemeContext } from "../../src/context/ThemeContext";

const FilterIcon = ({ size, filled }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <Svg height={size} width={size} viewBox="0 -960 960 960">
      <Path
        d="M440-160q-17 0-28.5-11.5T400-200v-240L168-736q-15-20-4.5-42t36.5-22h560q26 0 36.5 22t-4.5 42L560-440v240q0 17-11.5 28.5T520-160h-80Z"
        fill={filled ? theme["selected-icons"] : "transparent"}
        stroke={filled ? theme["selected-icons"] : theme["unselected-icons"]}
        strokeWidth={60}
      />
    </Svg>
  );
};

export default FilterIcon;
