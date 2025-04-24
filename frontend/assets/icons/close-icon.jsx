import Svg, { Path } from "react-native-svg";

import { useContext } from "react";
import { ThemeContext } from "../../src/context/ThemeContext.jsx";

const CloseIcon = ({ size }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <Svg height={size} width={size} viewBox="0 -960 960 960">
      <Path
        d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"
        fill={theme["selected-icons"]}
        stroke={theme["selected-icons"]}
        strokeWidth={10}
      />
    </Svg>
  );
};

export default CloseIcon;
