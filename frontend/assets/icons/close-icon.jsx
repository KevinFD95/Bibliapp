import Svg, { Path } from "react-native-svg";

import colors from "../../src/config/colors.json";

const CloseIcon = ({ size }) => {
  return (
    <Svg height={size} width={size} viewBox="0 -960 960 960">
      <Path
        d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"
        fill={colors.icons["selected-icons"]}
        stroke={colors.icons["selected-icons"]}
        strokeWidth={10}
      />
    </Svg>
  );
};

export default CloseIcon;
