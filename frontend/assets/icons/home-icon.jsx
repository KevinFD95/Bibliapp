import Svg, { Path } from "react-native-svg";

const HomeIcon = ({ size, filled, selectedColor, unselectedColor }) => {
  return (
    <Svg height={size} width={size} viewBox="0 -960 960 960">
      <Path
        d="M160-120v-480l320-240 320 240v480H560v-280H400v280H160Z"
        fill={filled ? selectedColor : "none"}
        stroke={filled ? selectedColor : unselectedColor}
        strokeWidth={50}
      />
    </Svg>
  );
};

export default HomeIcon;
