import { useContext } from "react";
import Svg, { Path } from "react-native-svg";
import { ThemeContext } from "../../src/context/ThemeContext";

const HomeIcon = ({ size, filled }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <Svg height={size} width={size} viewBox="0 -960 960 960">
      <Path
        d="M160-120v-480l320-240 320 240v480H560v-280H400v280H160Z"
        fill={filled ? theme["selected-icons"] : "none"}
        stroke={filled ? theme["selected-icons"] : theme["unselected-icons"]}
        strokeWidth={50}
      />
    </Svg>
  );
};

export default HomeIcon;
