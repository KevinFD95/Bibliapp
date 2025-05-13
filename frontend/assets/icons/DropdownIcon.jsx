import Svg, { Path } from "react-native-svg";
import { useContext } from "react";
import { ThemeContext } from "../../src/context/ThemeContext";

const DropdownIcon = ({ size, filled }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <Svg height={size} viewBox="0 -960 960 960" width={size}>
      <Path
        d="M480-360 280-560h400L480-360Z"
        fill={filled ? theme["selected-icons"] : theme["unselected-icons"]}
        stroke={filled ? theme["selected-icons"] : theme["unselected-icons"]}
        strokeWidth={1}
      />
    </Svg>
  );
};

export default DropdownIcon;
