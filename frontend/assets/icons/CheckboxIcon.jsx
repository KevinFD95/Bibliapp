import Svg, { Path } from "react-native-svg";

import { useContext } from "react";
import { ThemeContext } from "../../src/context/ThemeContext.jsx";

const CheckboxIcon = ({ size, checked }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <Svg height={size} width={size} viewBox="0 -960 960 960">
      {checked ? (
        <Path
          d="m424-312 282-282-56-56-226 226-114-114-56 56 170 170ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Z"
          fill={theme["selected-icons"]}
        />
      ) : (
        <Path
          d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Z"
          fill={theme["unselected-icons"]}
        />
      )}
    </Svg>
  );
};

export default CheckboxIcon;
