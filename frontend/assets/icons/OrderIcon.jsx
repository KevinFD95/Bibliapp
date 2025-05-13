import Svg, { Path } from "react-native-svg";
import { useContext } from "react";
import { ThemeContext } from "../../src/context/ThemeContext";

const OrderIcon = ({ size, checked }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <Svg height={size} viewBox="0 -960 960 960" width={size}>
      {checked ? (
        <Path
          d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z"
          fill={theme["selected-icons"]}
          stroke={theme["selected-icons"]}
          strokeWidth={1}
        />
      ) : (
        <Path
          d="M480-528 296-344l-56-56 240-240 240 240-56 56-184-184Z"
          fill={theme["selected-icons"]}
          stroke={theme["selected-icons"]}
          strokeWidth={1}
        />
      )}
    </Svg>
  );
};

export default OrderIcon;
