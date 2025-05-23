import { useContext } from "react";
import Svg, { Path } from "react-native-svg";
import { ThemeContext } from "../../src/context/ThemeContext";

const LibraryIcon = ({ size, filled }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <Svg height={size} width={size} viewBox="0 -960 960 960">
      <Path
        d="M480-160q-48-38-104-59t-116-21q-42 0-82.5 11T100-198q-21 11-40.5-1T40-234v-482q0-11 5.5-21T62-752q46-24 96-36t102-12q74 0 126 17t112 52q11 6 16.5 14t5.5 21v418q44-21 88.5-31.5T700-320q36 0 70.5 6t69.5 18v-481q15 5 29.5 11t28.5 14q11 5 16.5 15t5.5 21v482q0 23-19.5 35t-40.5 1q-37-20-77.5-31T700-240q-60 0-116 21t-104 59Zm140-240v-440l120-40v440l-120 40Z"
        fill={filled ? theme["selected-icons"] : "none"}
        stroke={filled ? theme["selected-icons"] : theme["unselected-icons"]}
        strokeWidth={50}
      />
    </Svg>
  );
};

export default LibraryIcon;
