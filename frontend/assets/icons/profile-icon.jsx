import Svg, { Path } from "react-native-svg";

const ProfileIcon = ({ size, filled, selectedColor, unselectedColor }) => {
  return (
    <Svg height={size} width={size} viewBox="0 -960 960 960">
      <Path
        d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Z"
        fill={filled ? selectedColor : "none"}
        stroke={filled ? selectedColor : unselectedColor}
        strokeWidth={50}
      />
    </Svg>
  );
};

export default ProfileIcon;
